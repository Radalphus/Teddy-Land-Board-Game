import { playerColorOptions } from './deck';

// The color-selection screen: each player picks a color in turn.
// Props:
//   playerColors — colors chosen so far, e.g. ['red']
//   onPick(color) — called when a color button is clicked
function ColorScreen({ playerColors, onPick }) {
  return (
    <div>
      <h1>Teddy Land</h1>
      <p>Player {playerColors.length + 1}, pick your color:</p>
      {playerColorOptions.map((color) => (
        <button
          key={color}
          onClick={() => onPick(color)}
          disabled={playerColors.includes(color)} // can't pick a color already taken
        >
          {color}
        </button>
      ))}
      <p>Taken: {playerColors.length > 0 ? playerColors.join(', ') : '(none yet)'}</p>
    </div>
  );
}

export default ColorScreen;
