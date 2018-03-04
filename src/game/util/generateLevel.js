import Level from '../model/Level'
import { randomRange } from './randomRange'

const minRoomSize = 4
const maxRoomSize = 12

const minRooms = 5
const maxRooms = 8

const generateCandidateRooms = ({ width, height }) => {
    const numRooms = randomRange(minRooms, maxRooms)
    const rooms = []

    for (let i = 0; i < numRooms; ++i) {
        const roomWidth = randomRange(minRoomSize, maxRoomSize)
        const roomHeight = randomRange(minRoomSize, maxRoomSize)

        const room = {
            x: randomRange(0, width - roomWidth),
            y: randomRange(0, height - roomHeight),
            width: roomWidth,
            height: roomHeight
        }

        rooms.push(room)
    }

    return rooms
}

const roomsOverlap = (room1, room2) => {
    const overlappingX = room1.x > room2.x + room2.width
        || room2.x > room1.x + room1.width
    const overlappingY = room1.y < room2.y + room2.height
        || room2.y < room1.y + room1.height

    return !overlappingX || !overlappingY
}

const checkCandidateRooms = rooms => {
    for (let i = 0; i < rooms.length; ++i) {
        for (let j = 0; j < rooms.length; ++j) {
            if (i === j) {
                continue
            }

            if (roomsOverlap(rooms[i], rooms[j])) {
                return false
            }
        }
    }

    return true
}

const simplyConnected = (graph) => {
    const indices = {}

    for (let i = 0; i < graph.length; ++i) {
        indices[i] = true
    }

    const search = j => {
        graph[j].forEach((edge, k) => {
            if (edge) {
                if (typeof indices[k] !== 'undefined') {
                    delete indices[k]
                    search(k)
                }
            }
        })
    }

    search(0)
    return Object.keys(indices).length === 0
}

const connectRoomPair = (map, rooms, i, j) => {
    const iCenter = {
        x: rooms[i].x + Math.floor(rooms[i].width / 2),
        y: rooms[i].y + Math.floor(rooms[i].height / 2)
    }

    const jCenter = {
        x: rooms[j].x + Math.floor(rooms[j].width / 2),
        y: rooms[j].y + Math.floor(rooms[j].height / 2)
    }

    let angle = Math.atan2(
        iCenter.y - jCenter.y,
        iCenter.x - jCenter.x
    )

    const fmod = function (a,b) { return Number((a - (Math.floor(a / b) * b)).toPrecision(8)); }
    angle = fmod(angle, 2 * Math.PI)

    let side = null

    if (angle >= Math.PI / 4 && angle <= 3 * Math.PI / 4) {
        side = 'top'
    } else if (angle > 3 * Math.PI / 4 && angle <= 5 * Math.PI / 4) {
        side = 'right'
    } else if (angle > 5 * Math.PI / 4 && angle <= 7 * Math.PI / 4) {
        side = 'bottom'
    } else {
        side = 'left'
    }

    const steps = []

    let startX = null
    if (side === 'left') {
        startX = rooms[i].x
    } else if (side === 'right') {
        startX = rooms[i].x + rooms[i].width - 1
    } else {
        startX = rooms[i].x + randomRange(1, rooms[i].width - 1)
    }

    let startY = null
    if (side === 'top') {
        startY = rooms[i].y
    } else if (side === 'bottom') {
        startY = rooms[i].y + rooms[i].height - 1
    } else {
        startY = rooms[i].y + randomRange(1, rooms[i].height - 1)
    }

    let endX = null
    if (side === 'left') {
        endX = rooms[j].x + rooms[j].width - 1
    } else if (side === 'right') {
        endX = rooms[j].x
    } else {
        endX = rooms[j].x + randomRange(1, rooms[j].width - 1)
    }

    let endY = null
    if (side === 'top') {
        endY = rooms[j].y + rooms[j].height - 1
    } else if (side === 'bottom') {
        endY = rooms[j].y
    } else {
        endY = rooms[j].y + randomRange(1, rooms[j].height - 1)
    }

    if (side === 'left') {
        steps.push([ startX, startY ])
        startX -= 1
    } else if (side === 'right') {
        steps.push([ startX, startY ])
        startX += 1
    }

    if (side === 'top') {
        steps.push([ startX, startY ])
        startY -= 1
    } else if (side === 'bottom') {
        steps.push([ startX, startY ])
        startY += 1
    }

    let xi = null
    if (side === 'left') {
        xi = -1
    } else if (side === 'right') {
        xi = 1
    } else {
        xi = Math.sign(endX - startX)
    }

    let yi = null
    if (side === 'top') {
        yi = -1
    } else if (side === 'bottom') {
        yi = 1
    } else {
        yi = Math.sign(endY - startY)
    }

    // check for collision
    for (let y = startY; y !== endY; y += yi) {
        steps.push([startX, y])
        const hasTouch = map[y][startX]

        if (hasTouch) {
            return null
        }
    }

    for (let x = startX; x !== endX; x += xi) {
        steps.push([x, endY])
        const hasTouch = map[endY][x]

        if (hasTouch) {
            return null
        }
    }

    steps.push([endX, endY])
    return steps
}

const MAX_CONNECT_ATTEMPTS = 100

const connectRooms = (map, rooms) => {
    const graph = []
    const roomConnections = []
    let attempts = 0

    // initialize empty graph
    for (let i = 0; i < rooms.length; ++i) {
        graph[i] = []

        for (let j = 0; j < rooms.length; ++j) {
            graph[i][j] = i === j
        }
    }

    while (!simplyConnected(graph) && attempts < MAX_CONNECT_ATTEMPTS) {
        const i = randomRange(0, rooms.length - 1)
        const j = randomRange(0, rooms.length - 1)

        if (graph[i][j]) {
            continue
        }

        const roomConnection = connectRoomPair(map, rooms, i, j)
        if (roomConnection === null) {
            continue
        }

        graph[i][j] = true
        graph[j][i] = true

        console.log(`Connected room ${i} and ${j}.`)
        roomConnections.push(roomConnection)

        ++attempts
    }

    if (attempts === MAX_CONNECT_ATTEMPTS) {
        throw new Error('Failed to connect rooms in time')
    }

    return roomConnections
}

const MAX_ATTEMPTS = 10000

export const generateLevel = (options) => {
    let candidateRooms = generateCandidateRooms(options)
    let attempts = 0

    while (!checkCandidateRooms(candidateRooms) && attempts < MAX_ATTEMPTS) {
        candidateRooms = generateCandidateRooms(options)
        attempts++
    }

    if (attempts === MAX_ATTEMPTS) {
        throw new Error('Failed to find candidate rooms')
    }

    console.log(`Level with ${candidateRooms.length} rooms generated.`)
    console.log(`Found after ${attempts} attempts.`)

    const map = {}
    for (let yi = 0; yi < options.height; ++yi) {
        map[yi] = {}
    }

    candidateRooms.forEach(({ x, y, width, height }) => {
        for (let yi = y; yi < y + height; ++yi) {
            for (let xi = x; xi < x + width; ++xi) {
                const border = yi === y || yi === (y + height - 1)
                    || xi === x || xi === (x + width - 1)

                map[yi][xi] = {
                    char: border ? '#' : '.'
                }
            }
        }
    })

    const roomConnections = connectRooms(map, candidateRooms)
    roomConnections.forEach(conn => {
        conn.forEach(([x, y]) => {
            map[y][x] = {
                char: '.'
            }
        })
    })

    return new Level(map, options)
}
