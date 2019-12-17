import React, {useState, useEffect} from 'react'
import Player from './Player'
import CommunityCards from './CommunityCards'
import gameobject from '../../GameObject'
import PlayerTurnMenu from './PlayerTurnMenu'
import gameServices from '../../services/gameTable'
import io from 'socket.io-client';
import LeaveButton from './LeaveButton'
import userStore from '../../redux/userStore'
import ChatBox from '../chat/chat.jsx'
const socket = io()


const GameTable = ({match}) => {
  const [gameState, setGameState] = useState(null)
  const gameId = match.params.id

  localStorage.setItem('gameid', gameId)

  socket.emit('join',gameId)

  
  
  socket.on('gameState',(data) => {
    setGameState(data)
  })
  
  useEffect(() => {
    gameServices
    .getGameState(gameId)
    .then(initialGameState => {
      setGameState(initialGameState)
      console.log(gameState)
    })
    .catch(error => {
      console.log(error)
    })
  },[])

  useEffect(() => {
    if(gameState !== null) {
      if(gameState.betting_round > 4){
        if(localStorage.getItem('username') === 'jon'){
          gameServices.gameOver(gameId)
        }
      }
    }
  },[gameState])

  if(gameState !== null){
    localStorage.setItem('playerposition',gameState.players.findIndex(player => player.username === localStorage.getItem('username')))
  }

  console.log(gameState)

  if(gameState === null){
    return (
      <div><h2>Loading...</h2></div>
    )
  } else {
    return (
      <div id="table">
        <div id='pot'>Pot: {gameState.pot_amount}</div>
        <LeaveButton gameId={gameId} username={userStore.getState().username} playerIndex='1' />
        {gameState.players.map((player, index) => <Player key={player.username} player={player} index={index} gameId={gameId} />)}
        <CommunityCards cards={gameState.community_cards} currentBettingRound={gameState.betting_round} />
        <PlayerTurnMenu isRaised={gameState.last_raised} gameId={gameId} playerTurn={gameState.current_player}/>
        <ChatBox  />
      </div>
    )
  }
}

export default GameTable

export function leaveGameRoom(gameid){

  socket.emit('leaveRoom', ({path: gameid }))

}
