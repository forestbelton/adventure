import React, { Component } from 'react'
import styled from 'styled-components'

import { HeroStats } from './component/HeroStats'
import { GameScreen } from './component/GameScreen'
import { StatusLog } from './component/StatusLog'

import { newGame } from './game/Game'

const MainPanel = styled.div`
  display: flex;
`

const screenWidth = 20
const screenHeight = 10

class UnstyledApp extends Component {
  constructor(...args) {
    super(...args)

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.state = {
      game: newGame()
    }
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  handleKeyDown(ev) {
    const { game } = this.state
    const position = game.position()
    let newPosition = null

    switch (ev.key) {
      case 'ArrowUp':
        newPosition = {
            x: position.x,
            y: position.y - 1
        }
        break

      case 'ArrowDown':
        newPosition = {
            x: position.x,
            y: position.y + 1
        }
        break

      case 'ArrowLeft':
        newPosition = {
          x: position.x - 1,
          y: position.y
        }
        break

      case 'ArrowRight':
        newPosition = {
          x: position.x + 1,
          y: position.y
        }
        break

      default:
    }

    if (newPosition !== null) {
      const cell = game.level.cell(newPosition.x, newPosition.y)

      if (cell !== null && cell.char === '.') {
        this.setState({
          game: game.position(newPosition)
        })
      }
    }
  }

  render() {
    const { className } = this.props
    const { game } = this.state

    return (
      <div className={className} onKeyDown={this.handleKeyDown}>
        <h1>adventure</h1>
        <MainPanel>
          <HeroStats hero={game.hero} />
          <GameScreen screen={game.screen(screenWidth, screenHeight)} />
        </MainPanel>
        <StatusLog log={game.log} />
      </div>
    )
  }
}

const App = styled(UnstyledApp)`
  color: #fff;
  display: flex;
  flex-direction: column;
  font-family: 'Inconsolata', Consolas, Monaco, monospace;
  margin-top: 100px;
`

export default App
