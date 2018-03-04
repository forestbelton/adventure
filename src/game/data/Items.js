const Items = {
    'rusty sword': {
        type: 'gear',
        description: 'This sword has seen better days.',
        slot: 'weapon',
        atk: 2,
        matk: 0
    },
    'broken dagger': {
        type: 'gear',
        description: 'Half of the blade is missing.',
        slot: 'weapon',
        atk: 1,
        matk: 0
    },
    'small health potion': {
        type: 'consumable',
        description: 'Heals a small amount of health.',
        use: ({ health, ...target }) => ({
            ...target,
            health: Math.min(health + 3, target.maxHealth)
        })
    }
}

export default Items
