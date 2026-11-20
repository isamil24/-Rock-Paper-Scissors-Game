
/* =================================
   ROCK PAPER SCISSORS GAME
================================= */

// 1. Store choices in an array
const choices = ["rock", "paper", "scissors"];

// 2. Store the current score in an object
const score = {
    player: 0,
    computer: 0
};

// 3. Game settings
const winningScore = 3;
let gameOver = false;

// 4. Get HTML elements
const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");

const roundNumber = document.getElementById("round-number");
const turnMessage = document.getElementById("turn-message");

const playerChoiceElement = document.getElementById("player-choice");
const computerChoiceElement = document.getElementById("computer-choice");

const playerChoiceName = document.getElementById("player-choice-name");
const computerChoiceName = document.getElementById("computer-choice-name");

const resultSection = document.querySelector(".result-section");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");

const highScoreElement = document.getElementById("high-score");

const winnerModal = document.getElementById("winner-modal");
const winnerTitle = document.getElementById("winner-title");
const winnerDescription = document.getElementById("winner-description");
const winnerIcon = document.getElementById("winner-icon");

const finalPlayerScore = document.getElementById("final-player-score");
const finalComputerScore = document.getElementById("final-computer-score");

const choiceButtons = document.querySelectorAll(".choice-btn");
const restartButton = document.getElementById("restart-btn");
const playAgainButton = document.getElementById("play-again-btn");


// =================================
// 5. HIGH SCORE USING LOCAL STORAGE
// =================================

let highScore = Number(localStorage.getItem("rpsHighScore")) || 0;

highScoreElement.textContent = highScore;


// =================================
// 6. SOUND EFFECTS
// =================================

// Sounds are generated using the Web Audio API.
// No external audio files are required.

let audioContext;

function playSound(type) {

    try {

        if (!audioContext) {
            audioContext = new (
                window.AudioContext ||
                window.webkitAudioContext
            )();
        }

        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        let frequency = 440;
        let duration = 0.2;

        // Winning sound
        if (type === "win") {
            frequency = 660;
            duration = 0.3;
        }

        // Losing sound
        else if (type === "lose") {
            frequency = 180;
            duration = 0.4;
        }

        // Draw sound
        else if (type === "draw") {
            frequency = 350;
            duration = 0.2;
        }

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(
            frequency,
            audioContext.currentTime
        );

        if (type === "win") {
            oscillator.frequency.linearRampToValueAtTime(
                880,
                audioContext.currentTime + duration
            );
        }

        if (type === "lose") {
            oscillator.frequency.linearRampToValueAtTime(
                100,
                audioContext.currentTime + duration
            );
        }

        gain.gain.setValueAtTime(
            0.2,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + duration
        );

        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);

    } catch (error) {
        console.log("Audio is not available:", error);
    }
}


// =================================
// 7. GET COMPUTER CHOICE
// =================================

function getComputerChoice() {

    const randomIndex = Math.floor(
        Math.random() * choices.length
    );

    return choices[randomIndex];
}


// =================================
// 8. GET CHOICE EMOJI
// =================================

function getEmoji(choice) {

    if (choice === "rock") {
        return "✊";
    }

    else if (choice === "paper") {
        return "✋";
    }

    else if (choice === "scissors") {
        return "✌️";
    }
}


// =================================
// 9. UPDATE SCOREBOARD
// =================================

function updateScoreboard() {

    playerScoreElement.textContent = score.player;
    computerScoreElement.textContent = score.computer;

    const currentRound = score.player + score.computer + 1;

    roundNumber.textContent =
        `ROUND ${Math.min(currentRound, 5)} / 5`;
}


// =================================
// 10. DISPLAY RESULT
// =================================

function showResult(title, message, resultClass) {

    resultTitle.textContent = title;
    resultMessage.textContent = message;

    resultSection.className = "result-section";

    if (resultClass) {
        resultSection.classList.add(resultClass);
    }
}


// =================================
// 11. SAVE HIGH SCORE
// =================================

function saveHighScore() {

    if (score.player > highScore) {

        highScore = score.player;

        localStorage.setItem(
            "rpsHighScore",
            highScore
        );

        highScoreElement.textContent = highScore;
    }
}


// =================================
// 12. CHECK WINNER
// =================================

function checkWinner(player, computer) {

    if (player === computer) {
        return "draw";
    }

    else if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return "player";
    }

    else {
        return "computer";
    }
}


// =================================
// 13. PLAY THE GAME
// =================================

function playGame(playerChoice) {

    // Stop playing if the match is finished
    if (gameOver) {
        return;
    }

    // Computer makes a random choice
    const computerChoice = getComputerChoice();

    // Display both choices
    playerChoiceElement.textContent = getEmoji(playerChoice);
    computerChoiceElement.textContent = getEmoji(computerChoice);

    playerChoiceName.textContent = playerChoice;
    computerChoiceName.textContent = computerChoice;

    // Decide who wins
    const winner = checkWinner(playerChoice, computerChoice);

    // Use if/else to update the score
    if (winner === "player") {

        score.player++;

        showResult(
            "🎉 YOU WIN THIS ROUND!",
            `${playerChoice} beats ${computerChoice}. Great move!`,
            "win"
        );

        playSound("win");

    }

    else if (winner === "computer") {

        score.computer++;

        showResult(
            "😢 COMPUTER WINS!",
            `${computerChoice} beats ${playerChoice}. Try again!`,
            "lose"
        );

        playSound("lose");

    }

    else {

        showResult(
            "🤝 IT'S A DRAW!",
            "Both players chose the same thing. No points!",
            "draw"
        );

        playSound("draw");
    }

    // Update the scoreboard
    updateScoreboard();

    // Save the player's best score
    saveHighScore();

    // Update turn information
    turnMessage.textContent = "Round completed! Make your next move.";

    // Check whether someone has won the match
    checkGameOver();
}


// =================================
// 14. CHECK BEST OF 5
// =================================

function checkGameOver() {

    if (
        score.player === winningScore ||
        score.computer === winningScore
    ) {

        gameOver = true;

        // Disable all choice buttons
        choiceButtons.forEach(button => {
            button.disabled = true;
        });

        turnMessage.textContent = "Match finished!";

        // Show the final winner
        showFinalWinner();
    }
}


// =================================
// 15. FINAL WINNER SCREEN
// =================================

function showFinalWinner() {

    finalPlayerScore.textContent = score.player;
    finalComputerScore.textContent = score.computer;

    if (score.player > score.computer) {

        winnerTitle.textContent = "YOU ARE THE CHAMPION!";
        winnerDescription.textContent =
            "Amazing! You defeated the computer. Congratulations!";

        winnerIcon.textContent = "🏆";

    }

    else {

        winnerTitle.textContent = "COMPUTER WINS!";
        winnerDescription.textContent =
            "Good game! The computer won this match. Try again!";

        winnerIcon.textContent = "🤖";
    }

    winnerModal.classList.remove("hidden");
}


// =================================
// 16. RESTART GAME
// =================================

function restartGame() {

    // Reset the score object
    score.player = 0;
    score.computer = 0;

    gameOver = false;

    // Enable choice buttons again
    choiceButtons.forEach(button => {
        button.disabled = false;
    });

    // Reset displayed choices
    playerChoiceElement.textContent = "❔";
    computerChoiceElement.textContent = "❔";

    playerChoiceName.textContent = "Waiting...";
    computerChoiceName.textContent = "Waiting...";

    // Reset scoreboard
    updateScoreboard();

    // Reset messages
    turnMessage.textContent = "Your turn! Make your choice.";

    showResult(
        "READY TO PLAY?",
        "Select Rock, Paper or Scissors to begin.",
        ""
    );

    // Close winner screen
    winnerModal.classList.add("hidden");
}


// =================================
// 17. BUTTON EVENT LISTENERS
// =================================

// Listen for player choices
choiceButtons.forEach(button => {

    button.addEventListener("click", () => {

        const playerChoice = button.dataset.choice;

        playGame(playerChoice);

    });

});

// Restart button
restartButton.addEventListener("click", restartGame);

// Play again button
playAgainButton.addEventListener("click", restartGame);


// =================================
// 18. INITIALIZE GAME
// =================================

updateScoreboard();

console.log("Rock Paper Scissors Game is ready!");
