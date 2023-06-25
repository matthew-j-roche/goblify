import React from 'react'


function Modal({ isCorrect, solution, turn }) {
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1 className="solution">YES, {solution}</h1>
          <p>You found the solution in {turn}</p>
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