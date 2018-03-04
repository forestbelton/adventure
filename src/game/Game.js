import { generateLevel } from './util/generateLevel'
import { randomRange } from './util/randomRange'
import { randomHero } from './util/randomHero'

const findSpawnPoint = level => {
    let point = null

    while (point === null) {
        const x = randomRange(0, level.options.width)
        const y = randomRange(0, level.options.height)

        const validPoint = typeof level.map[y] !== 'undefined'
            && typeof level.map[y][x] !== 'undefined'
            && level.map[y][x].char === '.'

        if (validPoint) {
            point = { x, y }
        }
    }

    return point
}

export const newGame = () => {
    const hero = randomHero()
    const level = generateLevel({ width: 50, height: 50 })
    const position = findSpawnPoint(level)

    console.log(`Spawned at (${position.x}, ${position.y})`)
    return new Game({
        hero,
        log: ['Welcome to adventure!'],
        level,
        position
    })
}

export class Game {
    constructor({ hero, log, level, position }) {
        this.hero = hero
        this.log = log
        this.level = level
        this._position = position
    }

    screen(width, height) {
        return this.level.render(this._position, width, height)
    }

    position(newPosition) {
        return typeof newPosition === 'undefined'
            ? this._position
            : new Game({
                hero: this.hero,
                log: this.log,
                level: this.level,
                position: newPosition
            })
    }
}
