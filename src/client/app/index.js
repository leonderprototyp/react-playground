import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'

// TODO: import react as a module

// 5 - use arrays for repetitive components eg player list
const PLAYERS = [
  {
    name: "Leon",
    score: 5,
    id: 1
  },
  {
    name: "Alex",
    score: 15,
    id: 2
  },
  {
    name: "Andre",
    score: 25,
    id: 3
  }
]

// 4 - divide in small components
function Header (props) {
  return (
    <div>
      <div className="header">
      <h1>{props.title}</h1>
      </div>
    </div>
)
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}


function Counter (props) {
  return (
    <div className="counter">
    <button className="counter-action decrement" onClick={ function () {props.onChange(-1)}} > - </button>
    <div className="counter-score"> {props.score} </div>
    <button className="counter-action increment" onClick={ function () {props.onChange(+1)}} > + </button>
    </div>
)
}

Counter.propTypes = {
  score: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

function Player (props) {
  return (
    <div className="player">
    <div className="player-name"> {props.name} </div>
  <div className="player-score">
    <Counter onChange={props.counterScoreChange} score={props.score} />
  </div>
  </div>
)
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  counterScoreChange: PropTypes.func.isRequired
}

// 2 - create div wrapper of application as function (later as class bc higher up components should handle state bc data flows down from parent to child)
// object literal, so each key : value is methodname : function or function containing method like setState
// propTypes is key : object containing key : value

class Application extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      players: this.props.initialPlayers
    }
  }

  counterScoreChange (delta, index) {
    this.state.players[index].score += delta
    this.setState(this.state)
  }

  render () {
    return(
      <div className="scoreboard">
        <Header title={this.props.title} />
        <div className="players">
          {this.state.players.map(function(player, index) {
            return (
              <Player
                counterScoreChange={ function(delta) {this.counterScoreChange(delta, index)}.bind(this)}
                name={player.name}
                score={player.score}
                key={player.id}
              />
            )
          }.bind(this))}
        </div>
      </div>
    )
  }
}

Application.propTypes = {
  title: PropTypes.string.isRequired,
  initialPlayers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired
  }))
}

Application.defaultProps = {
  title: 'Training Scoreboard'
}

// 3 - add propTypes

// 1 - give div wrapper of application to render in DOM Element
render(<Application initialPlayers={PLAYERS}/> ,document.getElementById('app'))