import React, { useEffect, useState } from 'react'
import useWorblin from "./hooks/useWorblin"

// components
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

function WorblinGame({ solution }) {
const { currentGuess, guesses, turn, isCorrect, usedKeys, handleKeyup } = useWorblin(solution)
const [showModal, setShowModal] = useState(false)

useEffect(() => {
  window.addEventListener('keyup', handleKeyup)

  if (isCorrect) {
    setTimeout(() => setShowModal(true), 2000)
    window.removeEventListener('keyup', handleKeyup)
  }
  if (turn > 5) {
    setTimeout(() => setShowModal(true), 2000)
    window.removeEventListener('keyup', handleKeyup)
  }

  return () => window.removeEventListener('keyup', handleKeyup)
}, [handleKeyup, isCorrect, turn])

return (
  <div className='gameDiv'>
    <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
    <Keypad usedKeys={usedKeys} />
    {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
  </div>
)
}

export default WorblinGame;