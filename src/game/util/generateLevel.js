import Level from '../model/Level'
import { randomRange } from './randomRange'
import { randomChoice } from './randomChoice'

const defaultOptions = {
    width: 50,
    height: 50,
    cellSize: 10,
    minCells: 2,
    maxCells: 5
}

const inRange = (options, x, y) => x >= 0 && x < options.width
    && y >= 0 && y < options.height

const neighbors = (options, x, y) => {
    const sides = [
        { x: x - 1, y },
        { x: x + 1, y },
        { x, y: y - 1 },
        { x, y: y + 1 }
    ]

    return sides.filter(({ x, y }) => inRange(options, x, y))
}

export const generateLevel = userOptions => {
    const options = {
        ...defaultOptions,
        ...userOptions
    }

    const badCellSize = options.width % options.cellSize !== 0
        || options.height % options.cellSize !== 0

    if (badCellSize) {
        throw new Error(`Cell size of ${options.cellSize} does not divide ${options.width}x${options.height}`)
    }

    // subdivide level into cellSize x cellSize cells
    // randomly fill cells with rooms of size [3, options.width) x [3, options.height)
    // the minimum of 3 ensures there is always at least 1 walkable row/column within the room

    const numCells = randomRange(options.minCells, options.maxCells)
    const rooms = []

    for (let i = 0; i < numCells; ++i) {
        const cellX = randomRange(0, options.width / options.cellSize - 1)
        const cellY = randomRange(0, options.height / options.cellSize - 1)
        const width = randomRange(3, options.cellSize)
        const height = randomRange(3, options.cellSize)

        rooms.push({
            cellX,
            cellY,
            width,
            height
        })
    }

    const map = {}
    rooms.forEach((room, i) => {
        const startX = room.cellX * options.cellSize
        const startY = room.cellY * options.cellSize

        for (let y = startY; y < startY + room.height; ++y) {
            for (let x = startX; x < startX + room.width; ++x) {
                const border = y === startY || y === startY + room.height - 1
                    || x === startX || x === startX + room.width - 1

                map[y] = map[y] || {}
                map[y][x] = {
                    char: border ? '#' : '.'
                }
            }
        }
    })

    // random walk until all rooms visited
    const missingRooms = {}
    for (let i = 0; i < numCells; ++i) {
        missingRooms[i] = true
    }

    let currentX = randomRange(0, options.width - 1)
    let currentY = randomRange(0, options.height - 1)

    while (Object.keys(missingRooms).length > 0) {
        const nbrs = neighbors(options, currentX, currentY)
            .filter(({ x, y }) => x > 0 && x < options.width - 1 && y > 0 && y < options.height - 1)

        if (nbrs.length === 0) {
            currentX = randomRange(0, options.width - 1)
            currentY = randomRange(0, options.height - 1)
        } else {
            const nbr = randomChoice(nbrs)

            currentX = nbr.x
            currentY = nbr.y
        }

        map[currentY] = map[currentY] || {}
        map[currentY][currentX] = {
            char: '.'
        }

        neighbors(options, currentX, currentY)
            .forEach(({ x, y }) => {
                map[y] = map[y] || {}

                if (typeof map[y][x] === 'undefined') {
                    map[y][x] = {
                        char: '#'
                    }
                }
            })

        Object.keys(missingRooms).forEach(roomIndex => {
            const roomX = rooms[roomIndex].cellX * options.cellSize
            const roomY = rooms[roomIndex].cellY * options.cellSize

            const insideRoom = currentX >= roomX
                && currentX < roomX + rooms[roomIndex].width
                && currentY >= roomY
                && currentY < roomY + rooms[roomIndex].height

            if (insideRoom) {
                delete missingRooms[roomIndex]
            }
        })
    }

    return new Level(map, options)
}
