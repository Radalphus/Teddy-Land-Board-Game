// Card and deck logic — plain JavaScript, no React.

const cardRules = [
  { color: 'red', count: 12 },
  { color: 'blue', count: 12 },
  { color: 'green', count: 12 },
  { color: 'yellow', count: 12 },
  { color: 'purple', count: 12 },
  { color: 'white', count: 10 },
  { color: 'black', count: 10 },
];

// Colors a player can be tied to: every card color except black and white.
export const playerColorOptions = cardRules
  .map((rule) => rule.color)
  .filter((color) => color !== 'black' && color !== 'white');

export function createDeck() {
  const deck = [];
  for (const rule of cardRules) {
    for (let i = 0; i < rule.count; i++) {
      deck.push({ color: rule.color });
    }
  }
  return deck;
}

export function shuffleDeck(originalDeck) {
  const deck = [...originalDeck];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}
