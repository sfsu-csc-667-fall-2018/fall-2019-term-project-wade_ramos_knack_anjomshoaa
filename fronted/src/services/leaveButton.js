import axios from 'axios'
import history from '../history/history'
import io from 'socket.io-client'
import {leaveRoom} from '../../src/components/chat/chat.jsx'
import {leaveGameRoom} from '../components/game/GameTable'


const leaveGame = (gameId, username, playerIndex) => {
  const socket = io()
  axios.post(`${gameId}/${username}/leave`)
  .then(response => {
    leaveGameRoom(gameId)
    leaveRoom();

    socket.disconnect()

    history.push('/gameslobby')
  })
  .catch(error => {
    history.push('/gameslobby')
    console.log(error)
  })
}

export default {leaveGame}