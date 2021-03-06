class Level {
    constructor(map, entity, options) {
        this.map = map
        this.entity = entity || {}
        this.options = options || {}
    }

    cell(x, y) {
        return typeof this.map[y] === 'undefined' || typeof this.map[y][x] === 'undefined'
            ? null
            : this.map[y][x]
    }

    at(x, y) {
        if (typeof this.map[y] === 'undefined' || typeof this.map[y][x] === 'undefined') {
            return null
        } else if (typeof this.entity[y] !== 'undefined' && typeof this.entity[y][x] !== 'undefined') {
            return {
                type: 'entity',
                ...this.entity[y][x]
            }
        } else {
            return {
                type: 'cell',
                ...this.map[y][x]
            }
        }
    }

    render({ x, y }, width, height) {
        const out = []

        for (let yi = y - Math.floor(height / 2); yi < y + Math.ceil(height / 2); ++yi) {
            for (let xi = x - Math.floor(width / 2); xi < x + Math.ceil(width / 2); ++xi) {
                if (xi === x && yi === y) {
                    out.push('<span style="color: #0f0;">@</span>')
                    continue
                }

                const cell = this.at(xi, yi)
                if (cell === null) {
                    out.push(' ')
                    continue
                }

                const html = typeof cell.color === 'undefined'
                    ? cell.char
                    : `<span style="color: ${cell.color};">${cell.char}</span>`

                out.push(html)
            }

            out.push('<br />')
        }

        return out.join('')
    }
}

export default Level
