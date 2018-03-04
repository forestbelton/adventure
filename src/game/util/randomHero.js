import Names from '../data/Names'
import Classes from '../data/Classes'

import { randomChoice } from './randomChoice'
import { randomRange } from './randomRange'

export const randomHero = () => {
    const name = randomChoice(Names)
    const jobName = randomChoice(Object.keys(Classes))
    const job = Classes[jobName]

    const stats = {
        strength: randomRange.apply(null, job.stats.strength),
        intelligence: randomRange.apply(null, job.stats.intelligence),
        vitality: randomRange.apply(null, job.stats.vitality),
        luck: randomRange.apply(null, job.stats.luck),
        dexterity: randomRange.apply(null, job.stats.dexterity)
    }

    return {
        name,
        job: jobName,
        health: {
            current: 11,
            maximum: 11
        },
        mana: {
            current: 1,
            maximum: 1
        },
        stats,
        inventory: []
    }
}
