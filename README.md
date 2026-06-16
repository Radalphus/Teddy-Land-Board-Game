# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
## Teddy Land App Changes

This project was updated to implement a simple Teddy Land board game prototype in `src/App.jsx`.

What was added and fixed:

- Correct React import: `import { useState } from 'react'`
- Deck generation using `cardRules` and `createDeck()`
- In-place safe shuffling with `shuffleDeck()`
- State initialization that shuffles the deck once on first render
- A draw card button that moves cards from `deck` to `discardPile`
- React state updates with `setDeck()` and `setDiscardPile()` instead of mutating arrays directly

Currently, the app shows deck size, discard pile size, and the last drawn card.
Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
