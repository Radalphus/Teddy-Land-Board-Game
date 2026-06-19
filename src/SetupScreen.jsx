// The opening screen: choose how many players.
// Props: onChoose(count) — called when a player-count button is clicked.
function SetupScreen({ onChoose }) {
  return (
    <div>
      <h1>Teddy Land</h1>
      <h2>Welcome to Teddy Land!</h2>
      <h3>Board Game Prototype</h3>
      <p>How many players? (1–5)</p>
      {[1, 2, 3, 4, 5].map((count) => (
        <button key={count} onClick={() => onChoose(count)}>
          {count} {count === 1 ? 'Player' : 'Players'}
        </button>
      ))}
    </div>
  );
}

export default SetupScreen;
