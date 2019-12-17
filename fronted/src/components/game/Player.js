import React, {useState, useEffect} from 'react'
import Card from './Card'
import playerServices from '../../services/player'

const Player = ({player, index, gameId}) => {
  const joinGame = () => {
    playerServices
    .joinGame(gameId, index)
    .then(() => {
      
    })
    .catch(error => {
      console.log(error)
    })
  }

  if(player.username !== null && !player.isInHand) {
    return (
      <div className="not-in-hand" id={`player${index}`}>
        <div className="play-text-info">
          <div>
            {player.username}
          </div>
          <div>
            Chips: {player.chipCount}
          </div>
        </div>
      </div>
    )
  } else if (player.isInHand && player.username === localStorage.getItem('username')) {
    return (
      <div className="player" id={`player${index}`}>
        <div id="card">
          {player.holeCards.map((card, i) => <Card key={i} card={card} />)}
        </div>
        <div className="play-text-info">
          <div>
            {player.username}
          </div>
          <div>
            Chips: {player.chipCount}
          </div>
        </div>
      </div>
    )
  } else if (player.isInHand) {
    return (
      <div className="player" id={`player${index}`}>
        <div id="card">
          {player.holeCards.map((card, i) => <img src='gameslobby/resources/backOfCard.png' id='hole-card'/>)}
        </div>
        <div className="play-text-info">
          <div>
            {player.username}
          </div>
          <div>
            Chips: {player.chipCount}
          </div>
        </div>
      </div>
    )
    } else if(player.username === null) {
      return(
        <div id={`player${index}`}>
          <div className="join-button" onClick={joinGame}>Join Game</div>
        </div>
      )
  } else {
    return (
      <div></div>
    )
  }
}

export default Player