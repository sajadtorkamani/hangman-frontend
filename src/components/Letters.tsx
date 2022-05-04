import React, { useEffect } from 'react'
import { makeGuess } from '../store/gameSlice'
import { lettersGuessedSelector } from '../store/gameSliceSelectors'
import { useStoreDispatch, useStoreSelector } from '../store/hooks'
import { getLettersArray } from '../utils'

const Letters: React.FC = () => {
  const letters = getLettersArray()
  const dispatch = useStoreDispatch()
  const lettersGuessed = useStoreSelector(lettersGuessedSelector)

  const handleKeyPress = ({ key: letter }: KeyboardEvent) => {
    const isAlreadyGuessed = lettersGuessed.includes(letter)
    
    if (/^[A-Za-z]{1}$/.test(letter) && !isAlreadyGuessed) {
      dispatch(makeGuess(letter))
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)

    // Stop listening for key down when component is unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  })

  return (
    <div className="flex flex-wrap justify-center">
      {letters.map((letter) => {
        const isAlreadyGuessed = lettersGuessed.includes(letter)

        return (
          <button
            key={letter}
            className="bg-gray-100 hover:bg-gray-200 border border-gray-400
              rounded w-10 h-10 m-[3px] text-center text-[18px] 
              disabled:bg-gray-300 disabled:cursor-default"
            disabled={isAlreadyGuessed}
            onClick={() => dispatch(makeGuess(letter))}
          >
            {letter}
          </button>
        )
      })}
    </div>
  )
}

export default Letters
