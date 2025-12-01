<template>
  <div class="keyboard">
    <div v-for="(row, index) in keyboardLayout" :key="index" class="keyboard-row">
      <button
        v-for="key in row"
        :key="key"
        class="key"
        :class="[
          `key-${letterStates[key] || 'unused'}`,
          { 'key-wide': key === 'ENTER' || key === 'SLET' }
        ]"
        @click="handleKeyClick(key)"
      >
        {{ key === 'SLET' ? '⌫' : key }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LetterState } from '../composables/useWordle'

const props = defineProps<{
  letterStates: Record<string, LetterState>
  onKeyPress: (key: string) => void
}>()

const keyboardLayout = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Å'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Æ', 'Ø'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'SLET']
]

const handleKeyClick = (key: string) => {
  props.onKeyPress(key)
}
</script>

<style scoped>
.keyboard {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  margin: 0 auto;
  width: fit-content;
  max-width: 500px;
}

.keyboard-row {
  display: flex;
  gap: 6px;
  justify-content: center;
}

.key {
  min-width: 43px;
  height: 58px;
  border: none;
  border-radius: 4px;
  background-color: #818384;
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.1s ease;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
}

.key:hover {
  opacity: 0.8;
}

.key:active {
  transform: scale(0.95);
}

.key-wide {
  min-width: 65px;
  font-size: 0.75rem;
}

.key-unused {
  background-color: #818384;
}

.key-correct {
  background-color: #165b33;
}

.key-present {
  background-color: #c41e3a;
}

.key-absent {
  background-color: #3a3a3c;
}

@media (max-width: 480px) {
  .key {
    min-width: 32px;
    height: 48px;
    font-size: 0.75rem;
  }
  
  .key-wide {
    min-width: 48px;
    font-size: 0.65rem;
  }
  
  .keyboard-row {
    gap: 4px;
  }
  
  .keyboard {
    gap: 6px;
  }
}
</style>
