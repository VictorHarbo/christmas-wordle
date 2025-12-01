<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import GameBoard from './components/GameBoard.vue'
import Keyboard from './components/Keyboard.vue'
import { useWordle } from './composables/useWordle'

const {
  guesses,
  currentGuess,
  currentRow,
  message,
  letterStates,
  shakeRow,
  isGameOver,
  christmasDay,
  isChristmasPeriod,
  gameState,
  submitGuess,
  addLetter,
  deleteLetter,
  resetGame
} = useWordle()

const handleKeyPress = (key: string) => {
  if (key === 'ENTER') {
    submitGuess()
  } else if (key === 'SLET' || key === 'DELETE' || key === 'BACKSPACE') {
    deleteLetter()
  } else if (key.length === 1 && /^[A-ZÆØÅ]$/i.test(key)) {
    addLetter(key)
  }
}

const handleKeyboardEvent = (e: KeyboardEvent) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return
  
  const key = e.key.toUpperCase()
  if (key === 'ENTER') {
    e.preventDefault()
    submitGuess()
  } else if (key === 'BACKSPACE') {
    e.preventDefault()
    deleteLetter()
  } else if (/^[A-ZÆØÅ]$/.test(key)) {
    e.preventDefault()
    addLetter(key)
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyboardEvent)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyboardEvent)
})
</script>

<template>
  <div class="app christmas-theme">
    <header class="header">
      <div class="snow-decoration">❄️ ❄️ ❄️</div>
      <h1>🎄 MORS JULE WORDLE 🎄</h1>
      <div v-if="isChristmasPeriod" class="christmas-day">
        {{ christmasDay }}. December
      </div>
      <div v-else class="not-christmas">
        Julekalenderen åbner 1. december!
      </div>
      <div class="color-guide">
        <span class="guide-item">
          <span class="color-heart correct">❤️</span> Rigtigt bogstav, rigtig plads
        </span>
        <span class="guide-item">
          <span class="color-heart present">❤️</span> Rigtigt bogstav, forkert plads
        </span>
        <span class="guide-item">
          <span class="color-heart absent">❤️</span> Forkert bogstav
        </span>
      </div>
    </header>

    <div class="message" v-if="message">
      {{ message }}
    </div>

    <!-- Fireworks celebration -->
    <div v-if="gameState === 'won'" class="fireworks-container">
      <div class="fireworks-text">Sådan Mor! ❤️</div>
      <div class="firework" style="left: 20%; top: 30%;"></div>
      <div class="firework" style="left: 80%; top: 25%; animation-delay: 0.2s;"></div>
      <div class="firework" style="left: 50%; top: 40%; animation-delay: 0.4s;"></div>
      <div class="firework" style="left: 30%; top: 60%; animation-delay: 0.6s;"></div>
      <div class="firework" style="left: 70%; top: 55%; animation-delay: 0.8s;"></div>
      <div class="firework" style="left: 15%; top: 70%; animation-delay: 1.0s;"></div>
      <div class="firework" style="left: 85%; top: 65%; animation-delay: 1.2s;"></div>
      <div class="firework" style="left: 40%; top: 20%; animation-delay: 1.4s;"></div>
      <div class="firework" style="left: 60%; top: 75%; animation-delay: 1.6s;"></div>
      <div class="firework" style="left: 25%; top: 45%; animation-delay: 1.8s;"></div>
      <div class="firework" style="left: 75%; top: 35%; animation-delay: 2.0s;"></div>
      <div class="firework" style="left: 50%; top: 80%; animation-delay: 2.2s;"></div>
    </div>

    <main class="main">
      <GameBoard
        :guesses="guesses"
        :current-guess="currentGuess"
        :current-row="currentRow"
        :shake-row="shakeRow"
      />

      <Keyboard
        :letter-states="letterStates"
        :on-key-press="handleKeyPress"
      />
    </main>

    <div v-if="isGameOver" class="game-over">
      <button @click="resetGame" class="play-again-button">
        🎁 Spil Igen 🎁
      </button>
    </div>
  </div>
</template>

<style scoped>
.app {
  max-width: 500px;
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.christmas-theme {
  background: linear-gradient(180deg, #0a4d0a 0%, #121213 30%);
}

.header {
  text-align: center;
  padding: 10px 0 20px;
  border-bottom: 2px solid #c41e3a;
  margin-bottom: 20px;
  position: relative;
}

.snow-decoration {
  font-size: 1.5rem;
  margin-bottom: 10px;
  animation: float 3s ease-in-out infinite;
}

.header h1 {
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.2rem;
  margin: 10px 0;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(196, 30, 58, 0.5);
  white-space: nowrap;
}

.christmas-day {
  font-size: 1rem;
  color: #ffd700;
  font-weight: 600;
  margin-top: 8px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.not-christmas {
  font-size: 0.9rem;
  color: #a0a0a0;
  font-style: italic;
  margin-top: 8px;
}

.color-guide {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 12px;
  font-size: 0.8rem;
  color: #e0e0e0;
}

.guide-item {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
}

.color-heart {
  font-size: 1.2rem;
  display: inline-block;
  filter: grayscale(100%);
}

.color-heart.correct {
  filter: grayscale(100%) brightness(0.5) sepia(100%) hue-rotate(60deg) saturate(500%);
}

.color-heart.present {
  filter: grayscale(100%) brightness(0.8) sepia(100%) hue-rotate(310deg) saturate(600%);
}

.color-heart.absent {
  filter: grayscale(100%) brightness(0.3);
}

.message {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #c41e3a;
  color: #ffffff;
  padding: 16px 24px;
  border-radius: 8px;
  font-weight: 600;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(196, 30, 58, 0.4);
  animation: fadeIn 0.2s ease, fadeOut 0.2s ease 1.8s;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}

.game-over {
  text-align: center;
  padding: 20px 0;
}

.play-again-button {
  background: linear-gradient(135deg, #c41e3a 0%, #165b33 100%);
  color: #ffffff;
  border: none;
  padding: 14px 28px;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.play-again-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

.play-again-button:active {
  transform: scale(0.98) translateY(0);
}

.fireworks-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 999;
}

.fireworks-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  font-weight: 900;
  color: #c41e3a;
  text-shadow: 
    0 0 10px rgba(196, 30, 58, 0.8),
    0 0 20px rgba(196, 30, 58, 0.6),
    0 0 30px rgba(196, 30, 58, 0.4),
    3px 3px 6px rgba(0, 0, 0, 0.5);
  animation: celebrate 2s ease-in-out infinite;
  z-index: 1001;
}

.firework {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  animation: explode 1.5s ease-out infinite;
}

.firework::before,
.firework::after {
  content: '';
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
}

@keyframes celebrate {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@keyframes explode {
  0% {
    box-shadow: 
      0 0 0 0 #ffd700,
      0 0 0 0 #c41e3a,
      0 0 0 0 #165b33,
      0 0 0 0 #ffffff;
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    box-shadow: 
      0 -100px 20px 10px transparent,
      100px 0 20px 10px transparent,
      0 100px 20px 10px transparent,
      -100px 0 20px 10px transparent,
      70px -70px 15px 8px transparent,
      70px 70px 15px 8px transparent,
      -70px 70px 15px 8px transparent,
      -70px -70px 15px 8px transparent;
    transform: translate(0, -20px) scale(1.2);
    opacity: 0;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 1.6rem;
    letter-spacing: 0.2rem;
  }
  
  .snow-decoration {
    font-size: 1.2rem;
  }
}
</style>
