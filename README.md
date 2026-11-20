
# 🎮 Rock Paper Scissors Game

A fun and interactive Rock Paper Scissors game built using HTML, CSS, and JavaScript. Play against the computer, compete in a Best of 5 match, and try to achieve your highest score!

## 🌟 Features

- ✊ Rock, Paper, and Scissors choices.
- 🤖 Computer generates random choices.
- 🏆 Best of 5 game mode.
- 📊 Live player and computer score tracking.
- 🎵 Sound effects for winning, losing, and drawing.
- 💾 High score saved using localStorage.
- 🎉 Final winner screen when the match ends.
- 🔄 Restart and play again options.
- 📱 Responsive design for mobile and desktop.

## 🛠️ Technologies Used

- **HTML5** – Creates the structure of the game.
- **CSS3** – Provides the styling, animations, and responsive layout.
- **JavaScript** – Handles game logic, scoring, random choices, and sound effects.
- **localStorage** – Saves the player's highest score.

## 📂 Project Structure

rock-paper-scissors/
│
├── index.html
├── style.css
├── script.js
└── README.md

## 🎯 How to Play

1. Open the game in your browser.
2. Choose Rock, Paper, or Scissors.
3. The computer randomly selects its choice.
4. The game determines the winner of each round.
5. The first player to score 3 points wins the match.
6. Click **Play Again** to start a new game.

### Game Rules

- Rock beats Scissors.
- Scissors beats Paper.
- Paper beats Rock.
- Choosing the same option results in a draw.
- Draws do not add points.

## 💻 JavaScript Concepts Used

This project demonstrates important JavaScript concepts:

### 1. Arrays
Stores the available game choices.

```javascript
const choices = ["rock", "paper", "scissors"];
```

### 2. Objects
Tracks the current player and computer scores.

```javascript
const score = {
    player: 0,
    computer: 0
};
```

### 3. If/Else Conditionals
Determines the winner of each round.

### 4. Math.random()
Generates a random choice for the computer.

### 5. DOM Manipulation
Updates scores, choices, messages, and game results on the page.

### 6. localStorage
Saves the player's highest score in the browser.

## 🚀 How to Run Locally

1. Clone this repository:

```bash
git clone https://github.com/YOUR-USERNAME/rock-paper-scissors.git
```

2. Open the project folder:

```bash
cd rock-paper-scissors
```

3. Open `index.html` in your browser.

You can also use the Live Server extension in Visual Studio Code.


## 👨‍💻 Author

Created as a JavaScript learning project.

## 📄 License

This project is open source and available for learning and educational purposes.
