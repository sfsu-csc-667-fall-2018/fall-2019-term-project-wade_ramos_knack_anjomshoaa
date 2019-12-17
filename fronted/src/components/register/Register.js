import React, {useState} from 'react'
import registerServices from '../../services/register'
import history from '../../history/history'
import userStore from '../../redux/userStore'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const submitNewUser = (event) => {
    event.preventDefault()

    if(username.length === 0 || password.length === 0 || email.length === 0) {
      alert('Make sure you\'ve filled in all of the fields')
    } else if (password !== repeatPassword) {
      alert('Your passwords don\'t match')
    } else {
      const newUserObject = {
        username: username,
        password: password,
        email: email,
      }
      registerServices
        .register(newUserObject)
        .then(() => {
          userStore.dispatch({
            type: 'LOGIN_USER',
            data: {
              username: newUserObject.username
            }
          })
          history.push('/gameslobby')
        })
        .catch(error => {
          history.push('/register')
        })
    }
  }

  return (
    <div className="user-input">
      <img src='mainLogo.png' id='register-logo' alt='Logo for puppy poker' />
      <form onSubmit={submitNewUser}>
        <input type='text' onChange={handleUsernameChange} placeholder='Username' value={username}/><br />
        <input type='password' onChange={handlePasswordChange} placeholder='Password' value={password}/><br />
        <input type='password' onChange={handleRepeatPasswordChange} placeholder='Password' value={repeatPassword}/><br />
        <input type="email" onChange={handleEmailChange} placeholder='Email' value={email}/><br />
        <input type='submit' value='Register'/>
      </form>
    </div>
  )
}

export default Register