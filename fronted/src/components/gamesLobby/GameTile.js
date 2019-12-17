import React from 'react'
import {Link} from 'react-router-dom'

const GameTile = ({gameId, players}) => {
  const address = `gameslobby/${gameId}`

  return (
    <div className='game-tile'>
      Game:{gameId} Players: {players}/9 <Link to={address}>Join</Link>
    </div>
  )
}

export default GameTile