import axios from 'axios'
import userStore from '../redux/userStore'

const joinGame = (gameId, seatId) => {
  const request =  axios.post(`${gameId}/${userStore.getState().username}/${seatId}/join`)
  return request.then(response => response.data)
}

export default {joinGame}