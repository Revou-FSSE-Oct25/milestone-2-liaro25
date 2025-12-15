
// ==================================
// Rock Paper Scissors (Shoot!)
// ==================================

document.addEventListener("DOMContentLoaded", () => {
  // Element names in shoot.html
  const choiceButtons = document.querySelectorAll(".choice-btn");
  const roundResult = document.getElementById("round-result");
  const playerChoiceSpan = document.getElementById("player-choice");
  const computerChoiceSpan = document.getElementById("computer-choice");
  const playerScoreSpan = document.getElementById("player-score");
  const computerScoreSpan = document.getElementById("computer-score");
  const drawSpan = document.getElementById("draw");
  const resetButton = document.getElementById("reset-game");

  if (!choiceButtons.length || !roundResult || !resetButton) {
    return;
  }

  // Game State
  const state = {
    playerScore: 0,
    computerScore: 0,
    draw: 0,
    gameOver: false,
  };

  // Computer Randomly Choose Rock or Paper or Scissors
  function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

  // Change text into emoticon
  function prettifyChoice(choice) {
    if (choice === "rock") return "✊";
    if (choice === "paper") return "✋";
    if (choice === "scissors") return "✌️";
    return "-";
  }

  // Winner Results
  function playRound(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
      state.draw++;
      return "draw";
    }

    const playerWins =
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper");

    if (playerWins) {
      state.playerScore++;
      return "player"; //will show that the Player wins
    } else {
      state.computerScore++;
      return "computer"; //will show that the Computer wins
    }
  }

  // Updating Leader Board
  function updateLeaderboard() {
    playerScoreSpan.textContent = state.playerScore;
    computerScoreSpan.textContent = state.computerScore;
    drawSpan.textContent = state.draw;
  }

  // The winner is the one that reach 5 points first
  function checkGameOver() {
    if (state.playerScore >= 5 || state.computerScore >= 5) {
      state.gameOver = true;

      if (state.playerScore > state.computerScore) {
        roundResult.textContent =
          "You reached 5 points! Yeay YOU WIN!";
      } else {
        roundResult.textContent =
          "Computer reached 5 points! Oh No, YOU LOSE!";
      }
    }
  }

  // Handler ketika player klik tombol pilihan
  function handlePlayerChoice(event) {
    if (state.gameOver) {
      // Kalau sudah game over, jangan proses pilihan baru
      roundResult.textContent =
        "Game is over. Press Reset Game to play again!";
      return;
    }

    const playerChoice = event.currentTarget.dataset.choice; // "rock" | "paper" | "scissors"
    const computerChoice = getComputerChoice();

    // Tampilkan pilihan di UI
    playerChoiceSpan.textContent = prettifyChoice(playerChoice);
    computerChoiceSpan.textContent = prettifyChoice(computerChoice);

    // Main satu ronde
    const winner = playRound(playerChoice, computerChoice);

    // Update pesan result per ronde
    if (winner === "draw") {
      roundResult.textContent = "It's a draw!";
    } else if (winner === "player") {
      roundResult.textContent = "You win!";
    } else {
      roundResult.textContent = "Computer wins!";
    }

    // Updating the Leaderboard so the player know their score
    updateLeaderboard();

    // Check whether one of the player has already reached 5 points
    checkGameOver();
  }

  // After winner achieved, reset button clicked and games is being reset back to 0
  function resetGame() {
    state.playerScore = 0;
    state.computerScore = 0;
    state.draw = 0;
    state.gameOver = false;

    playerChoiceSpan.textContent = "-";
    computerChoiceSpan.textContent = "-";
    roundResult.textContent = "Let’s play! Make your first move.";

    updateScoreboard();
  }

  // Adding event listener to all button 
  choiceButtons.forEach((button) => {
    button.addEventListener("click", handlePlayerChoice);
  });

  // Adding event listener to reset button 
  resetButton.addEventListener("click", resetGame);

  // Initializing LeaderBoard
  updateLeaderboard();
});


// ==================================
// Guess the Number (Guess!) 
// ==================================


// Game state variables
let targetNumber;
let attemptsLeft;
let gameActive;
let previousGuesses;


// DOM elements
const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const feedback = document.getElementById("feedback");
const attemptsLeftSpan = document.getElementById("attemptsLeft");
const gameContainer = document.getElementById("gameContainer");
const gameOverContainer = document.getElementById("gameOverContainer");
const gameOverMessage = document.getElementById("gameOverMessage");
const resetBtn = document.getElementById("resetBtn");
const previousGuessesList = document.getElementById("guessList");
const previousGuessesContainer = document.getElementById("previousGuesses");

/**
 * Initialize a new game
 * Sets up all game variables and resets the UI
 */
function initGame() {
  // Generate random number between 1 and 100
  targetNumber = Math.floor(Math.random() * 100) + 1;
  attemptsLeft = 10;
  gameActive = true;
  previousGuesses = [];

  // Reset UI elements
  guessInput.value = "";
  guessInput.disabled = false;
  submitBtn.disabled = false;
  attemptsLeftSpan.textContent = attemptsLeft;

  // Hide/show appropriate containers
  gameContainer.classList.remove("hidden");
  gameOverContainer.classList.add("hidden");
  feedback.classList.add("hidden");
  previousGuessesContainer.classList.add("hidden");

  // Clear previous guesses display
  previousGuessesList.innerHTML = "";

  // Focus on input for better UX
  guessInput.focus();

  console.log("New game started! Target number:", targetNumber); // For debugging (remove in production)
}

/**
 * Validate user input
 * @param {string} input - The user's input
 * @returns {object} - Validation result with isValid boolean and message
 */

  function validateInput(input) {
  const number = Number(input);

  if (!Number.isInteger(number)) {
    return { isValid: false, message: "Input should be a whole number!" };
  }

  if (number < 1 || number > 100) {
    return { isValid: false, message: "Input should be between 1-100" };
  }

  return { isValid: true, number };
}


/**
 * Display feedback message to the user
 * @param {string} message - The message to display
 * @param {string} type - The type of message (success, error, info)
 */
function showFeedback(message, type = "info") {
  feedback.textContent = message;
  feedback.classList.remove(
    "hidden",
    "bg-green-100",
    "text-green-800",
    "bg-red-100",
    "text-red-800",
    "bg-blue-100",
    "text-blue-800",
    "bg-yellow-100",
    "text-yellow-800"
  );

  // Apply appropriate styling based on message type
  switch (type) {
    case "success":
      feedback.classList.add("bg-green-100", "text-green-800");
      break;
    case "error":
      feedback.classList.add("bg-red-100", "text-red-800");
      break;
    case "high":
      feedback.classList.add("bg-yellow-100", "text-yellow-800");
      break;
    case "low":
      feedback.classList.add("bg-blue-100", "text-blue-800");
      break;
    default:
      feedback.classList.add("bg-blue-100", "text-blue-800");
  }
}

/**
 * Add a guess to the previous guesses display
 * @param {number} guess - The number that was guessed
 */
function addToPreviousGuesses(guess) {
  previousGuesses.push(guess);

  // Create a span element for the guess
  const guessSpan = document.createElement("span");
  guessSpan.textContent = guess;
  guessSpan.className = "px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm";

  previousGuessesList.appendChild(guessSpan);
  previousGuessesContainer.classList.remove("hidden");
}

/**
 * Process the user's guess
 * @param {number} guess - The user's guess
 */
function processGuess(guess) {
  attemptsLeft--;
  attemptsLeftSpan.textContent = attemptsLeft;

  addToPreviousGuesses(guess);

  if (guess === targetNumber) {
    showFeedback(`You Win! The number was ${targetNumber}.`, "success");
    endGame(true);
    return;
  }

  if (attemptsLeft === 0) {
    showFeedback(`Game Over! The number was ${targetNumber}.`, "error");
    endGame(false);
    return;
  }

  if (guess > targetNumber) {
    showFeedback("Too high", "high");
  } else {
    showFeedback("Too low", "low");
  }

  // Prepare for next input
  guessInput.value = "";
  guessInput.focus();
}


/**
 * End the current game
 * @param {boolean} won - Whether the player won or lost
 */
function endGame(won) {
  gameActive = false;
  guessInput.disabled = true;
  submitBtn.disabled = true;

  // Show game over container
  gameContainer.classList.add("hidden");
  gameOverContainer.classList.remove("hidden");

  // Set appropriate game over message
  if (won) {
    const attempts = 10 - attemptsLeft;
    gameOverMessage.innerHTML = `
            <h2 class="text-2xl font-bold text-green-600 mb-2">🏆 You Won!</h2>
            <p class="text-gray-700">You guessed the number <strong>${targetNumber}</strong> in <strong>${attempts}</strong> attempt${
      attempts === 1 ? "" : "s"
    }!</p>
        `;
  } else {
    gameOverMessage.innerHTML = `
            <h2 class="text-2xl font-bold text-red-600 mb-2">💔 Game Over</h2>
            <p class="text-gray-700">The number was <strong>${targetNumber}</strong>. Don't give up!</p>
        `;
  }
}

/**
 * Handle the submit button click or Enter key press
 */
function handleSubmit() {
  console.log("test")
  if (!gameActive) return;

  const userInput = guessInput.value;
  const validation = validateInput(userInput);

  if (!validation.isValid) {
    showFeedback(validation.message, "error");
    guessInput.focus();
    return;
  }

  processGuess(validation.number);
}


// Event listeners
// YOUR CODE HERE

submitBtn.addEventListener("click", handleSubmit);
guessInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleSubmit();
  }
});

resetBtn.addEventListener("click", initGame);

// Initialize the game when page loads
initGame();

