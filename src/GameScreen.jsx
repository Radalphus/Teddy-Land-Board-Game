// The main game board.
// Props: all the game state it displays (deck, hands, discardPile, monsters,
// currentPlayer, playerColors, hasDrawn) plus the actions it can trigger
// (onDraw, onDiscard, onEndTurn).
function GameScreen({
  deck,
  hands,
  discardPile,
  monsters,
  currentPlayer,
  playerColors,
  hasDrawn,
  onDraw,
  onDiscard,
  onEndTurn,
}) {
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
                  onClick={() => onDiscard(cardIndex)}
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
      <button onClick={onDraw} disabled={deck.length === 0 || hasDrawn}>
        Draw Card
      </button>
      <button onClick={onEndTurn} disabled={hands[currentPlayer].length > 6}>
        End Turn
      </button>
    </div>
  );
}

export default GameScreen;
