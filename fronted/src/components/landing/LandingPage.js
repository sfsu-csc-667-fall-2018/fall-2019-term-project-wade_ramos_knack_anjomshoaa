import React from 'react'
import {Link} from 'react-router-dom'
const LandingPage = () => {
  return (
    <div id="landing-page">
      <img src='mainLogo.png' id="main-logo" alt='Logo for puppy poker' />
      <Link to='/login'><button id="login" className="landing-button">Login</button></Link>
      <Link to='/register'><button id="register" className="landing-button">Register</button></Link>
    </div>
    
  )
}

export default LandingPage