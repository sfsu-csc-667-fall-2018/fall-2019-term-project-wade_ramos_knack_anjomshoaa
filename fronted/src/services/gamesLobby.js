import axios from 'axios'

const getAllGames = () => {
  const request =  axios.get('gameslobby/allGames')
  return request.then(response => response.data)
}

const createNewGame = (username) => {
  const request = axios.post(`gameslobby/${username}/createGame`)
  return request.then(response => response.data)
}

export default {getAllGames, createNewGame}
