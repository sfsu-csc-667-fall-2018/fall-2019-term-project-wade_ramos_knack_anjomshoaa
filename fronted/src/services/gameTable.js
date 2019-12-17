import axios from 'axios'

const getGameState = (gameId) => {
  const request =  axios.get(`${gameId}/getGame`)
  return request.then(response => response.data)
}

const gameOver = (gameId) => {
  const request = axios.post(`${gameId}/gameOver`)
  return request.then(response => response)
}

export default {getGameState, gameOver}