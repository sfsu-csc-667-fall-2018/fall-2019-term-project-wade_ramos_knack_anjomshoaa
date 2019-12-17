import axios from 'axios'
const baseUrl = '/users/register'

const register = (newUserObject) => {
  const request =  axios.post(baseUrl, newUserObject)
  return request.then(response => response.data)
}

export default {register}