import axios from 'axios'
import userStore from '../redux/userStore'

const check = (gameId) => {
  const request =  axios.post(`${gameId}/${userStore.getState().username}/check`)
  return request.then(response => response.data)
}

const bet = (gameId) => {
  const request =  axios.post(`${gameId}/${userStore.getState().username}/bet`)
  return request.then(response => response.data)
}

const raise = (gameId) => {
  const request =  axios.post(`${gameId}/${userStore.getState().username}/raise`)
  return request.then(response => response.data)
}

const call = (gameId) => {
  const request =  axios.post(`${gameId}/${userStore.getState().username}/call`)
  return request.then(response => response.data)
}

const fold = (gameId) => {
  const request =  axios.post(`${gameId}/${userStore.getState().username}/fold`)
  return request.then(response => response.data)
}

export default {check, bet, raise, call, fold}