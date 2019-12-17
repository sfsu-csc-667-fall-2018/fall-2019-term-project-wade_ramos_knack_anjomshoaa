import axios from 'axios'
const baseUrl = 'users/login'

const login = (newLoginObject) => {
  const request =  axios.post(baseUrl, newLoginObject)
  return request.then(response => response.data)
}

export default {login}