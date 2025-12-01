// Christmas Calendar Words - December 1st to 25th
// Edit this file to customize the word for each day of December
// You can use words of different lengths (3-8 characters recommended)

export const CHRISTMAS_WORDS = [
  // Uge 1
  'gran',     // Dec 1 - 5 letters
  'lys',       // Dec 2 - 3 letters
  'kugle',     // Dec 3 - 5 letters
  'engel',     // Dec 4 - 5 letters
  'kogle',      // Dec 5 - 4 letters
  'krans',     // Dec 6 - 5 letters
  'flag',     // Dec 7 - 5 letters

  // Uge 2
  'sok',   // Dec 8 - 7 letters
  'kirke',      // Dec 9 - 4 letters
  'gløgg',     // Dec 10 - 5 letters
  'salme',     // Dec 11 - 5 letters
  'hygge',     // Dec 12 - 5 letters
  'gave',     // Dec 13 - 5 letters
  'sang',      // Dec 14 - 4 letters

  // Uge 3
  'slik',    // Dec 15 - 6 letters
  'sild',   // Dec 16 - 7 letters
  'nød',     // Dec 17 - 5 letters
  'ribs',       // Dec 18 - 3 letters
  'steg',      // Dec 19 - 4 letters
  'kage',    // Dec 20 - 6 letters
  'sovs',     // Dec 21 - 5 letters

  // Uge 4
  'bånd',      // Dec 22 - 4 letters
  'papir',   // Dec 23 - 7 letters
  'kort', // Dec 24 - 9 letters
  'gaver',     // Dec 25 - 5 letters (Christmas Day!)
]

// Validate that we have exactly 25 words
if (CHRISTMAS_WORDS.length !== 25) {
  console.warn(`Expected 25 Christmas words, but got ${CHRISTMAS_WORDS.length}`)
}
