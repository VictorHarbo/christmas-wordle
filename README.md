# 🎄 Christmas Wordle

A Danish Christmas calendar game based on Wordle, built with Vue 3, TypeScript, and Vite.

## ✨ Features

- **25-day Christmas calendar**: A unique word for each day from December 1st to 25th
- **Variable word length**: Words from 3-9 letters for extra challenge
- **Danish word validation**: Uses ordregister.dk API to validate Danish words
- **Exact length matching**: Guess words with the exact number of letters as the solution
- **Christmas theme**: Festive green/red color theme with snow decorations
- **Responsive design**: Works on both desktop and mobile
- **Danish keyboard**: Supports Æ, Ø, Å

## 🎮 How it works

Each day in December (1st-25th) has a new word to guess:
- 🟩 **Green**: Correct letter in correct position
- 🟥 **Red**: Correct letter in wrong position
- ⬛ **Gray**: Letter not in the word

You have 6 attempts to guess the daily word. Words can be 3-9 letters long!

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or newer)
- npm

### Installation
```bash
npm install
```

### Development
Start the development server:
```bash
npm run dev
```

The app is available at `http://localhost:5173/`

### Build
Create a production build:
```bash
npm run build
```

### Preview
Preview the production build locally:
```bash
npm run preview
```

## 🎁 Customizing Words

Edit `/src/data/christmasWords.ts` to change the words for each day:

```typescript
export const CHRISTMAS_WORDS = [
  'glade',     // Dec 1 - 5 letters
  'sne',       // Dec 2 - 3 letters
  'stjerne',   // Dec 8 - 7 letters
  // ... add your own words here!
]
```

Words can have any length (recommended 3-9 letters).

## 🧪 Testing a Specific Day

To test a specific day, open `/src/composables/useWordle.ts` and uncomment:

```typescript
const getChristmasDay = (): number | null => {
  // FOR TESTING: Uncomment the line below to test a specific day
  return 24 // This will make the app think it's December 24th
  
  // ... rest of the code
}
```

## 🛠 Tech Stack

- Vue 3 with Composition API and `<script setup>`
- TypeScript for type safety
- Vite for fast development and optimized builds
- CSS3 for styling and animations
- Ordregister.dk API for Danish word validation

## 📱 Responsive Design

The game is optimized for:
- Desktop computers
- Tablets
- Smartphones

The keyboard automatically adapts to screen size.

## 🎨 Features in Detail

- **Automatic date detection**: The game automatically selects today's word based on the date
- **API-based word validation**: All Danish words from ordregister.dk are accepted
- **Christmas calendar**: Only active December 1st-25th
- **Exact word length**: You must guess words with the exact number of letters as the solution
- **Christmas theme**: Christmas decorations, snow, and festive colors
- **Smooth animations**: Flip, shake, and pop effects
- **Victory celebration**: Fireworks display with "Sådan Mor! ❤️" message when you win
