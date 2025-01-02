# Morpion 64
This app is a 🕹️ tic tac toe 🎲 game with a 8x8 grid size (64 cells).

![Game in progress in Morpion 64](https://github.com/Aero15/morpion-64/blob/main/wiki/game.png?raw=true)

## Features
- **Large grid size**: 😮 yup you can play with a 64 grid size
- **Multiplayer**: have fun with your friends* 😂 or come to fight "dumb" bots (😜 sorry Siri and Cortana)
- **Ranking**: earn points and try to finish at the top 👑 of the leaderboard 🏆
- **Responsive**: this game can run on PC, tablets and smartphone 🔥
- **PWA** (Play With Android ✨): this app can be installed on your 📞📱 phone

*Unfortunately, ℹ️ it's not possible to play with your friends on the network🛜. Everything run on your browser, nothing outside 🥹 It will be possible in the future 🤞

## TODO list
Still have many things to do, 👁️👄👁️ look at zis :

- Play with friend ⚔️ on the network (or Bluetooth)
- 💾 Persistant data (score, profile, settings, etc...)
- Improve gameplay with new tools (or bonus) in game 💣 (bomb, suffle grid, moving cells, and more...)
- Limit answering time ⏲️ for players (with a circular progress bar behind avatar)
- Add some sound effects 🔊 for some events (you win, you loose, bot is playing, ...)
- Add a "end game" screen to display final leaderbord with earned score by players, with some confetti ✨ (hi Svelte Confetti)
- Add a "mashup" 🥗 screen to reveal order list or a "versus" screen  (P1 vs P2) before starting game
- Make bots powerful again 👿
- More symbols 😻 (animals, fruits and chess)
- More 💋💄 colors (or gradients) for players

## [DEV] Tech stack
This project uses some dependencies, all listed there :
- Svelte 5 (of course)
- Svelte SPA Router
- TypeScript
- Vite + PWA Plugin

## [DEV] How to run it
**Requirements**: Node.js
> npm run dev

Tested with Node.js v23.1.0

## [DEV] How to build it
Just run this command in a terminal
> npm run build

This command will ask Vite.js to compile this app. You'll find the whole bundle in the "dist" folder.