import React, { useEffect, useState } from 'react'
import useWorblin from "./hooks/useWorblin"
import { useAuth } from '../../Contexts/AuthContext'

// components
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

function WorblinGame({ solution }) {
  const {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn
  } = useAuth()
  console.log(authUser);
  console.log(isLoggedIn);
  const { currentGuess, guesses, turn, isCorrect, usedKeys, handleKeyup } = useWorblin(solution)
  const [showModal, setShowModal] = useState(false)
  
  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)
  
    if (isCorrect || turn > 5) {
      saveGameToServer(turn);
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener('keyup', handleKeyup)
    }
  
    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup, isCorrect, turn])
  
  const saveGameToServer = (turn) => {
    const today = new Date().getDate();
  
    const data = {
      worblin_id: today,  // Use the current day's ID as the worblinId
      user_id: authUser.id,
      guesses: turn  // Use the turn as the number of guesses
    }
    console.log(data);

    fetch('http://localhost:4000/user-worblins', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'You have already played this game') {
          console.log(data.message);
        } else {
          console.log(data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error)
      })
}

return (
  <div className='gameDiv'>
    <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
    <Keypad usedKeys={usedKeys} />
    {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
  </div>
)
}

export default WorblinGame;