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

// Colors a player can be tied to: every card color except black and white.
const playerColorOptions = cardRules
  .map((rule) => rule.color)
  .filter((color) => color !== 'black' && color !== 'white');

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
  // numPlayers is null until the player count is chosen on the setup screen.
  const [numPlayers, setNumPlayers] = useState(null);
  const [deck, setDeck] = useState(() => shuffleDeck(createDeck()));
  const [hands, setHands] = useState([]);
  const [discardPile, setDiscardPile] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [hasDrawn, setHasDrawn] = useState(false); // has the current player drawn this turn yet?
  const [monsters, setMonsters] = useState([]); // black cards drawn during play go here, not into a hand
  const [playerColors, setPlayerColors] = useState([]); // the color each player picked, e.g. ['red', 'blue']

  // Step 1: the player count is chosen — start fresh color selection.
  const choosePlayerCount = (count) => {
    setNumPlayers(count);
    setPlayerColors([]);
  };

  // Step 2: a player picks their color. Once everyone has, deal the cards.
  const pickColor = (color) => {
    const newColors = [...playerColors, color];
    setPlayerColors(newColors);
    if (newColors.length === numPlayers) {
      dealCards(newColors);
    }
  };

  // Step 3: build the deck from the chosen colors (+ white, + black) and deal.
  const dealCards = (colors) => {
    const cardsPerPlayer = 5;
    const fullDeck = createDeck();

    // Initial deck = only the chosen colors plus white. Unpicked colors are excluded.
    const dealableColors = [...colors, 'white'];
    const blackCards = fullDeck.filter((card) => card.color === 'black');
    const normalCards = fullDeck.filter((card) => dealableColors.includes(card.color));

    // Deal the opening hands from the shuffled normal cards.
    const dealDeck = shuffleDeck(normalCards);
    const newHands = [];
    for (let i = 0; i < numPlayers; i++) {
      const start = i * cardsPerPlayer;
      newHands.push(dealDeck.slice(start, start + cardsPerPlayer));
    }

    // After dealing, shuffle the black cards into the leftover normal cards.
    const leftoverNormal = dealDeck.slice(numPlayers * cardsPerPlayer);
    const playDeck = shuffleDeck([...leftoverNormal, ...blackCards]);

    setHands(newHands);
    setDeck(playDeck);
    setDiscardPile([]);
    setCurrentPlayer(0);
    setHasDrawn(false);
    setMonsters([]); // clear the monster zone for a new game
  };


  const drawCard = () => {
    if (deck.length === 0) {
      return;
    }
    if (hasDrawn) {
      return; // only one draw per turn unless another rule says otherwise
    }

    const nextCard = deck[deck.length - 1];
    setDeck(deck.slice(0, deck.length - 1));

    if (nextCard.color === 'black') {
      setMonsters([...monsters, nextCard]); // a monster — goes to the monster zone, not the hand
    } else {
      setHands(hands.map((hand, i) => (i === currentPlayer ? [...hand, nextCard] : hand)));
    }

    setHasDrawn(true); // either way, the draw is used up for this turn
  };

  const discardCard = (cardIndex) => {
    const hand = hands[currentPlayer];
    if (hand.length <= 6) {
      return; // can only discard down to six, not below
    }
    const cardToDiscard = hand[cardIndex];
    const newHand = hand.filter((card, i) => i !== cardIndex); // keep every card except the clicked one
    setHands(hands.map((h, i) => (i === currentPlayer ? newHand : h)));
    setDiscardPile([...discardPile, cardToDiscard]);
  };

  const endTurn = () => {
    if (hands[currentPlayer].length > 6) {
      return; // too many cards — must discard down to 6 before the turn can pass
    }
    setCurrentPlayer((currentPlayer + 1) % numPlayers);
    setHasDrawn(false); // fresh turn for the next player — they may draw again
  };

  // Setup screen: choose the number of players before the game starts.
  if (numPlayers === null) {
    return (
      <div>
        <h1>Teddy Land</h1>
        <h2>Welcome to Teddy Land!</h2>
        <h3>Board Game Prototype</h3>
        <p>How many players? (1–5)</p>
        {[1, 2, 3, 4, 5].map((count) => (
          <button key={count} onClick={() => choosePlayerCount(count)}>
            {count} {count === 1 ? 'Player' : 'Players'}
          </button>
        ))}
      </div>
    );
  }

  // Color-selection screen: each player picks a color before the deal.
  if (playerColors.length < numPlayers) {
    return (
      <div>
        <h1>Teddy Land</h1>
        <p>Player {playerColors.length + 1}, pick your color:</p>
        {playerColorOptions.map((color) => (
          <button
            key={color}
            onClick={() => pickColor(color)}
            disabled={playerColors.includes(color)} // can't pick a color already taken
          >
            {color}
          </button>
        ))}
        <p>Taken: {playerColors.length > 0 ? playerColors.join(', ') : '(none yet)'}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Teddy Land</h1>
      <h2>Welcome to Teddy Land!</h2>
      <h3>Board Game Prototype</h3>
      <p>Deck of Cards: {deck.length}</p>
      {hands.map((hand, i) => (
        <div key={i}>
          <strong>Player {i + 1} ({playerColors[i]}):</strong>{' '}
          {hand.length === 0 && '(empty)'}
          {i === currentPlayer
            ? // current player's cards are clickable to discard
              hand.map((card, cardIndex) => (
                <button
                  key={cardIndex}
                  onClick={() => discardCard(cardIndex)}
                  disabled={hand.length <= 6}
                >
                  {card.color}
                </button>
              ))
            : // other players' cards are just text
              hand.map((card) => card.color).join(', ')}
        </div>
      ))}
      <p>Discard Pile: {discardPile.length}</p>
      <p>
        <strong>Monsters:</strong>{' '}
        {monsters.length > 0 ? monsters.map((card) => card.color).join(', ') : '(none yet)'}
      </p>
      <p>It's Player {currentPlayer + 1}'s turn.</p>
      {hands[currentPlayer].length > 6 && (
        <p>You have {hands[currentPlayer].length} cards — click cards to discard down to 6 before ending your turn.</p>
      )}
      <button onClick={drawCard} disabled={deck.length === 0 || hasDrawn}>
        Draw Card
      </button>
      <button onClick={endTurn} disabled={hands[currentPlayer].length > 6}>
        End Turn
      </button>
    </div>
  );
}

export default App;