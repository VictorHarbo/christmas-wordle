import { ref, computed } from 'vue'
import { CHRISTMAS_WORDS } from '../data/christmasWords'

export type LetterState = 'correct' | 'present' | 'absent' | 'empty' | 'tbd'

export interface Tile {
  letter: string
  state: LetterState
}

export const useWordle = () => {
  const MAX_GUESSES = 6

  // Get the current day of December (1-25) or null if outside Christmas period
  const getChristmasDay = (): number | null => {
    // FOR TESTING: Uncomment the line below to test a specific day
    //return 3 // This will make the app think it's December 24th
    
    const now = new Date()
    const month = now.getMonth() // 0-11, so December is 11
    const day = now.getDate() // 1-31
    
    if (month === 11 && day >= 1 && day <= 25) {
      return day
    }
    return null
  }

  // Get the word for today's Christmas calendar
  const getTodaysWord = (): string => {
    const day = getChristmasDay()
    
    if (day !== null) {
      const word = CHRISTMAS_WORDS[day - 1] // Array is 0-indexed
      return word ? word.toUpperCase() : 'JULEN'
    }
    
    // Outside Christmas period, use a random Christmas word as fallback
    const word = CHRISTMAS_WORDS[Math.floor(Math.random() * CHRISTMAS_WORDS.length)]
    return word ? word.toUpperCase() : 'JULEN'
  }

  const christmasDay = ref(getChristmasDay())
  const isChristmasPeriod = computed(() => christmasDay.value !== null)
  
  // Game state
  const solution = ref(getTodaysWord())
  const wordLength = computed(() => solution.value.length)
  
  const createEmptyGuesses = () => {
    return Array(MAX_GUESSES).fill(null).map(() => 
      Array(wordLength.value).fill(null).map(() => ({ letter: '', state: 'empty' as LetterState }))
    )
  }
  
  const guesses = ref<Tile[][]>(createEmptyGuesses())
  const currentGuess = ref('')
  const currentRow = ref(0)
  const gameState = ref<'playing' | 'won' | 'lost'>('playing')
  const message = ref('')
  const shakeRow = ref(false)

  // Letter states for keyboard
  const letterStates = ref<Record<string, LetterState>>({})

  const isGameOver = computed(() => gameState.value !== 'playing')

  const checkGuess = (guess: string): Tile[] => {
    const result: Tile[] = []
    const solutionArray = solution.value.split('')
    const guessArray = guess.split('')
    const letterCount: Record<string, number> = {}

    // Count letters in solution
    solutionArray.forEach((letter: string) => {
      letterCount[letter] = (letterCount[letter] || 0) + 1
    })

    // First pass: mark correct letters
    guessArray.forEach((letter, i) => {
      if (letter === solutionArray[i]) {
        result[i] = { letter, state: 'correct' }
        letterCount[letter] = (letterCount[letter] || 1) - 1
      } else {
        result[i] = { letter, state: 'tbd' }
      }
    })

    // Second pass: mark present/absent letters
    result.forEach((tile) => {
      if (tile.state === 'tbd') {
        const count = letterCount[tile.letter] || 0
        if (count > 0) {
          tile.state = 'present'
          letterCount[tile.letter] = count - 1
        } else {
          tile.state = 'absent'
        }
      }
    })

    return result
  }

  const updateLetterStates = (tiles: Tile[]) => {
    tiles.forEach(tile => {
      const currentState = letterStates.value[tile.letter]
      if (!currentState || 
          tile.state === 'correct' || 
          (tile.state === 'present' && currentState !== 'correct')) {
        letterStates.value[tile.letter] = tile.state
      } else if (tile.state === 'absent' && !currentState) {
        letterStates.value[tile.letter] = 'absent'
      }
    })
  }

  // Validate word against Danish dictionary API
  const validateWord = async (word: string): Promise<boolean> => {
    try {
      const response = await fetch(`https://ordregister.dk/lemma/COR/json/${word.toLowerCase()}`)
      const data = await response.json()
      
      // Check if the response contains status: "ok"
      return data.status === 'ok'
    } catch (error) {
      console.error('Error validating word:', error)
      // Fallback: accept the word if API fails
      return true
    }
  }

  const submitGuess = async () => {
    if (currentGuess.value.length !== wordLength.value) {
      showMessage('Ikke korrekt antal bogstaver')
      shakeRow.value = true
      setTimeout(() => shakeRow.value = false, 600)
      return
    }

    const guessLower = currentGuess.value.toLowerCase()
    
    // Check if word exists in Christmas words list OR validate via API
    const isChristmasWord = CHRISTMAS_WORDS.map(w => w.toLowerCase()).includes(guessLower)
    const isValidWord = isChristmasWord || await validateWord(guessLower)
    
    if (!isValidWord) {
      showMessage('Ikke i ordlisten')
      shakeRow.value = true
      setTimeout(() => shakeRow.value = false, 600)
      return
    }

    const result = checkGuess(currentGuess.value)
    guesses.value[currentRow.value] = result
    updateLetterStates(result)

    if (currentGuess.value === solution.value) {
      gameState.value = 'won'
      showMessage('Fremragende!')
    } else if (currentRow.value === MAX_GUESSES - 1) {
      gameState.value = 'lost'
      showMessage(solution.value)
    } else {
      currentRow.value++
    }

    currentGuess.value = ''
  }

  const addLetter = (letter: string) => {
    if (currentGuess.value.length < wordLength.value && !isGameOver.value) {
      currentGuess.value += letter.toUpperCase()
    }
  }

  const deleteLetter = () => {
    if (!isGameOver.value) {
      currentGuess.value = currentGuess.value.slice(0, -1)
    }
  }

  const showMessage = (msg: string) => {
    message.value = msg
    setTimeout(() => message.value = '', 2000)
  }

  const resetGame = () => {
    solution.value = getTodaysWord()
    guesses.value = createEmptyGuesses()
    currentGuess.value = ''
    currentRow.value = 0
    gameState.value = 'playing'
    message.value = ''
    letterStates.value = {}
  }

  return {
    guesses,
    currentGuess,
    currentRow,
    gameState,
    message,
    letterStates,
    shakeRow,
    isGameOver,
    christmasDay,
    isChristmasPeriod,
    wordLength,
    submitGuess,
    addLetter,
    deleteLetter,
    resetGame,
    MAX_GUESSES
  }
}
