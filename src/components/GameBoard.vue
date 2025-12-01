<template>
  <div class="game-board">
    <div 
      v-for="(row, rowIndex) in guesses" 
      :key="rowIndex"
      class="board-row"
      :class="{ 'shake': shakeRow && rowIndex === currentRow }"
    >
      <div
        v-for="(tile, tileIndex) in row"
        :key="tileIndex"
        class="tile"
        :class="[
          `tile-${tile.state}`,
          { 
            'tile-filled': tile.letter || (rowIndex === currentRow && currentGuess[tileIndex]),
            'pop': tile.state !== 'empty' && tile.state !== 'tbd'
          }
        ]"
        :style="{ animationDelay: `${tileIndex * 0.1}s` }"
      >
        {{ tile.letter || (rowIndex === currentRow ? currentGuess[tileIndex] : '') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tile } from '../composables/useWordle'

defineProps<{
  guesses: Tile[][]
  currentGuess: string
  currentRow: number
  shakeRow: boolean
}>()
</script>

<style scoped>
.game-board {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  margin: 0 auto;
  width: fit-content;
}

.board-row {
  display: flex;
  gap: 5px;
}

.tile {
  width: 62px;
  height: 62px;
  border: 2px solid #3a3a3c;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #ffffff;
  background-color: transparent;
  transition: all 0.3s ease;
}

.tile-filled {
  border-color: #565758;
  animation: pop 0.1s ease-in-out;
}

.tile-correct {
  background-color: #165b33;
  border-color: #165b33;
  animation: flip 0.5s ease;
}

.tile-present {
  background-color: #c41e3a;
  border-color: #c41e3a;
  animation: flip 0.5s ease;
}

.tile-absent {
  background-color: #3a3a3c;
  border-color: #3a3a3c;
  animation: flip 0.5s ease;
}

.shake {
  animation: shake 0.6s;
}

@keyframes pop {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes flip {
  0% {
    transform: rotateX(0);
  }
  50% {
    transform: rotateX(-90deg);
  }
  100% {
    transform: rotateX(0);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-5px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(5px);
  }
}

@media (max-width: 480px) {
  .tile {
    width: 52px;
    height: 52px;
    font-size: 1.5rem;
  }
}
</style>
