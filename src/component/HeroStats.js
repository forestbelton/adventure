import React from 'react'
import styled from 'styled-components'

const UnstyledHeroStats = ({ className, hero }) => (
    <div className={className}>
        <div>Name: {hero.name}</div>
        <div>Class: {hero.job}</div>
        <br />
        <div>HP: {hero.health.current} / {hero.health.maximum}</div>
        <div>MP: {hero.mana.current} / {hero.mana.maximum}</div>
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