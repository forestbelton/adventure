import Level from '../model/Level'
import { randomRange } from './randomRange'

const minRoomSize = 4
const maxRoomSize = 12

const minRooms = 3
const maxRooms = 6

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

const MAX_ATTEMPTS = 100

export const generateLevel = (options) => {
    let candidateRooms = generateCandidateRooms(options)
    let attempts = 0

    while (!checkCandidateRooms(candidateRooms) && attempts < MAX_ATTEMPTS) {
        candidateRooms = generateCandidateRooms(options)
        attempts++
    }

    if (attempts === MAX_ATTEMPTS) {
        throw new Error('failed to find candidate rooms')
    }

    console.log(`Level with ${candidateRooms.length} rooms generated.`)
    console.log(`Found after ${attempts} attempts.`)

    const map = {}
    candidateRooms.forEach(({ x, y, width, height }) => {
        for (let yi = y; yi < y + height; ++yi) {
            map[yi] = {}

            for (let xi = x; xi < x + width; ++xi) {
                const border = yi === y || yi === (y + height - 1)
                    || xi === x || xi === (x + width - 1)

                map[yi][xi] = {
                    char: border ? '#' : '.'
                }
            }
        }
    })

    return new Level(map, options)
}
