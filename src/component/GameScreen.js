import React from 'react'
import styled from 'styled-components'

const UnstyledGameScreen = ({ className, screen }) => (
    <pre className={className} dangerouslySetInnerHTML={{__html: screen }} />
)

export const GameScreen = styled(UnstyledGameScreen)`
    width: 400px;
    height: 350px;
    margin: 0;
    font-size: 18px;
`
