import { RootState } from './store'

export const selectGuessWord = (state: RootState) => state.game.guessWord

export const selectMask = (state: RootState): string[] => {
  const { guessWord, correctGuesses } = state.game

  const mask = guessWord.split('').map((letter) => {
    return correctGuesses.includes(letter) ? letter : '_'
  })

  return mask
}
