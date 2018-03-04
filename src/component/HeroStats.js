import React from 'react'
import styled from 'styled-components'

const leftPad = (str, len, ch = '\u00a0')=> {
    const paddingCount = Math.max(len - str.toString().length, 0)
    let padding = ''

    for (let i = 0; i < paddingCount; ++i) {
        padding += ch
    }

    return padding + str
}

const UnstyledHeroStats = ({ className, hero }) => (
    <div className={className}>
        <div>Name:&nbsp;&nbsp;{hero.name}</div>
        <div>Class: {hero.job}</div>
        <br />
        <div>HP: {leftPad(hero.health.current, 3)} / {leftPad(hero.health.maximum, 3)}</div>
        <div>MP: {leftPad(hero.mana.current, 3)} / {leftPad(hero.mana.maximum, 3)}</div>
        <br />
        <div>STR: {hero.stats.strength}</div>
        <div>INT: {hero.stats.intelligence}</div>
        <div>VIT: {hero.stats.vitality}</div>
        <div>LUK: {hero.stats.luck}</div>
        <div>DEX: {hero.stats.dexterity}</div>
        <br />
        <div>Inventory</div>
        <div>---------</div>
        {hero.inventory.map((item, i) => <div key={i}>{item}</div>)}
    </div>
)

export const HeroStats = styled(UnstyledHeroStats)`
    width: 200px;
`