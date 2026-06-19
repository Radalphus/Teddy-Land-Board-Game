# Teddy Land Board Game

A board game prototype built with React + Vite. All game logic lives in `src/App.jsx`.

## Running the app

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (e.g. `http://localhost:5173/`).

## How the game works

### Setup

1. **Choose the number of players (1–5)** on the opening screen.
2. **Each player picks a color.** The selectable colors are every card color
   except black and white (red, blue, green, yellow, purple). Each player is
   tied to a distinct color — once a color is taken, the next player can't pick
   it.
3. **The deck is built from the chosen colors only**, plus white cards. Colors
   nobody picked are left out of the deck entirely. Each player is dealt **5
   cards** from this (shuffled) deck.
4. **Black cards (monsters) are held back** during the deal so they can't end up
   in an opening hand, then shuffled into the draw deck afterward.

### Playing a turn

- On your turn you may **draw one card** (the Draw Card button disables after
  one draw).
- Drawing a **black card** sends it to the shared **Monsters** zone instead of
  your hand — and it still uses up your draw for the turn.
- **End Turn** passes play to the next player.

### Hand limit

- Your hand may temporarily exceed 6 cards (e.g. you carry 6 into a turn and
  draw a 7th).
- You **must discard down to 6** before you can end your turn — End Turn is
  disabled while you hold more than 6.
- Click a card in your hand to discard it. Discarding stops at 6; you can't go
  below.

## Change log (since the initial draw-to-discard prototype)

- **Player setup flow**: choose player count, then a color-selection screen.
- **Color-based deck**: the deck is composed only of the players' chosen colors
  plus white; unpicked colors are excluded.
- **Opening deal**: each player starts with 5 cards, dealt from a deck with no
  black cards.
- **Monsters**: black cards are shuffled in after the deal and go to a dedicated
  monster zone when drawn, never into a hand.
- **Turn structure**: drawing and ending a turn are separate actions; only one
  draw is allowed per turn.
- **Hand limit**: hands cap at 6 — you must discard down to 6 (and no lower)
  before ending your turn.
- **Immutable state updates** throughout (new arrays via `slice`/`filter`/spread
  instead of mutating state in place).

## Project notes (Vite template)

This project was scaffolded with the React + Vite template (HMR + ESLint).

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

The React Compiler is not enabled because of its impact on dev & build
performance. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

For production apps, consider TypeScript with type-aware lint rules — see the
[TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)
and [`typescript-eslint`](https://typescript-eslint.io).
