const Classes = {
    'Knight': {
        description: 'Great at hacking, slashing, and not much else.',
        stats: {
            strength: [3, 6],
            intelligence: [1, 1],
            vitality: [2, 4],
            luck: [1, 1],
            dexterity: [2, 3]
        }
    },
    'Wizard': {
        description: "Will it be a wingardium leviosa or an avada kedavra? You don't want to stick around to find out.",
        stats: {
            strength: [1, 1],
            intelligence: [3, 7],
            vitality: [1, 2],
            luck: [1, 1],
            dexterity: [2, 3]
        }
    },
    'Acrobat': {
        description: 'Adept in moving nimbly and jumping around.',
        stats: {
            strength: [2, 3],
            intelligence: [1, 2],
            vitality: [2, 2],
            luck: [1, 2],
            dexterity: [3, 6]
        }
    },
    'Cat': {
        description: 'Cats are relatively weak, but their agility and stroke of luck make up for it.',
        stats: {
            strength: [1, 3],
            intelligence: [1, 3],
            vitality: [1, 3],
            luck: [3, 5],
            dexterity: [2, 5]
        }
    }
}

export default Classes
