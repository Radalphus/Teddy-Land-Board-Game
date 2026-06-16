import { useState } from 'react';

const cardRules = [
  { color: 'red', count: 12 },
  { color: 'blue', count: 12 },
  { color: 'green', count: 12 },
  { color: 'yellow', count: 12 },
  { color: 'purple', count: 12 },
  { color: 'white', count: 10 },
  { color: 'black', count: 10 },
];

function createDeck() {
  const deck = [];
  for (const rule of cardRules) {
    for (let i = 0; i < rule.count; i++) {
      deck.push({ color: rule.color });
    }
  }
  return deck;
}

function shuffleDeck(originalDeck) {
  const deck = [...originalDeck];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function App() {
  const [deck, setDeck] = useState(() => shuffleDeck(createDeck()));
  const [discardPile, setDiscardPile] = useState([]);

  const drawCard = () => {
    if (deck.length === 0) {
      return;
    }

    const nextCard = deck[deck.length - 1];
    setDeck(deck.slice(0, deck.length - 1));
    setDiscardPile([...discardPile, nextCard]);
  };

  const lastDrawnCard = discardPile.length > 0 ? discardPile[discardPile.length - 1].color : 'None';

  return (
    <div>
      <h1>Teddy Land</h1>
      <h2>Welcome to Teddy Land!</h2>
      <h3>Board Game Prototype</h3>
      <p>Deck of Cards: {deck.length}</p>
      <p>Discard Pile: {discardPile.length}</p>
      <p>Click the button to draw a card from the deck.</p>
      <button onClick={drawCard} disabled={deck.length === 0}>
        Draw Card
      </button>
      <p>Drawn Card: {lastDrawnCard}</p>
    </div>
  );
}

export default App;