import React, {useState, useEffect} from 'react'
import gamesLobbyServices from '../../services/gamesLobby'
import history from '../../history/history'
import {Link} from 'react-router-dom'
import './gamesLobby.css'
import ChatBox from '../chat/chat.jsx'
import userStore from '../../redux/userStore'
import GameTile from './GameTile'



const GamesLobby = () => {
  const [games, setGames] = useState(null)

  const createGame = () => {
    gamesLobbyServices
    .createNewGame(userStore.getState().username)
    .then(gameId => {
      history.push(`/gameslobby/${gameId}`)
    })
  }

  console.log(localStorage.getItem('username'))

  const logoutUser = () => {
    userStore.dispatch({type: 'LOGOUT_USER'})
    localStorage.removeItem('username')
    history.push('/')
  }

  useEffect(() => {
    /*if(userStore.getState().username === '') {
      history.push('/login')
    }*/
    
    gamesLobbyServices
      .getAllGames()
      .then(currentGames => {
          setGames(currentGames)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])


  if(games === null) {
    return (
      <>
        <button onClick={createGame}>Create Game</button>
        <button onClick={logoutUser}>Logout</button>
        <h2>Loading...</h2>
      </>
    )
  } else {
    return (
      <div className='gameslobby-container'>
        <div id='gameslobby-user-menu'>
          
        </div>
        <div className='chat-container'>
          <ChatBox chatClass = "lobby" />
        </div>
        <div className='gameslobby-games-tiles'>
          <h2>Welcome {localStorage.getItem('username')}!</h2>
          <button onClick={createGame}>Create Game</button>
          <button onClick={logoutUser}>Logout</button>
          <h2>Active Games</h2>
          {games.map(game =><GameTile key={game.id} gameId={game.id} players={game.player_count} /> )} 
        </div>
      </div>
    )
  }

 
}
const gameBoxes =() =>{
  return(
    <div>
    <div className='game-tiles'>
      <form>
      <input type="submit" value="Enter Game" title="Enter Game" className='enter-game-button'></input>
      </form>
    </div>
    </div>
  )
}

const userBox = () =>{
  const handleLogout = () => {
    userStore.dispatch({type: 'LOGOUT_USER'})
    history.push('/')
  }

  const createNewGame = () => {
    gamesLobbyServices
      .createNewGame()
      .then(() => {

      })
      .catch(error => {
        console.log(error)
        history.push('/gameslobby')
      })
  }

  return(
      <div>
        <div className='lobby-username'>
          <h2>{userStore.getState().username}</h2>
        </div>
          <div className='winnings'>
            <h4>Winnings:</h4>
          </div>

        <div className='userInfo'>
          <img src='./profileIcon.png' id="profile-logo" />
          <button type="button" className='log-out' onClick={handleLogout}>Log Out</button><br/>
          <button type="button" className='create-game' onClick={createNewGame}>Create Game</button><br/>
        </div>
        </div>
  )
}

export default GamesLobby