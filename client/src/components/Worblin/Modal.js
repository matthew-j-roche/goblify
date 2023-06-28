import React from 'react'


function Modal({ isCorrect, solution, turn }) {
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1 className="solution">You did it...</h1>
          <p>It took you {turn} guesses</p>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>{solution}</h1>
          <p>Better luck next time :)</p>
        </div>
      )}
    </div>
  )
}
export default Modal;