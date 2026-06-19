import { useState } from 'react';
import { createDeck, shuffleDeck } from './deck';
import SetupScreen from './SetupScreen';
import ColorScreen from './ColorScreen';
import GameScreen from './GameScreen';

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

  // App is now a "traffic cop": it owns the state and decides which screen to
  // show, handing each screen the data and actions it needs via props.

  // Setup screen: choose the number of players before the game starts.
  if (numPlayers === null) {
    return <SetupScreen onChoose={choosePlayerCount} />;
  }

  // Color-selection screen: each player picks a color before the deal.
  if (playerColors.length < numPlayers) {
    return <ColorScreen playerColors={playerColors} onPick={pickColor} />;
  }

  // The game board.
  return (
    <GameScreen
      deck={deck}
      hands={hands}
      discardPile={discardPile}
      monsters={monsters}
      currentPlayer={currentPlayer}
      playerColors={playerColors}
      hasDrawn={hasDrawn}
      onDraw={drawCard}
      onDiscard={discardCard}
      onEndTurn={endTurn}
    />
  );
}

export default App;