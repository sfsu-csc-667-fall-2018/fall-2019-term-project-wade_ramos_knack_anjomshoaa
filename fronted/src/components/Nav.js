import React from 'react'
import {Link} from 'react-router-dom'

const Nav = () => {
  const navStyle = {
    color: 'white',
  }

  return (
    <nav>
      <h1>Puppy Poker</h1>
      <ul className='nav-links'>
        <Link style={navStyle} to='/'><li>Login</li></Link>
        <Link style={navStyle} to='/register'><li>Register</li></Link>
        <Link style={navStyle} to='/gameslobby'><li>Games Lobby</li></Link>
      </ul>
    </nav>
  )
}

export default Nav