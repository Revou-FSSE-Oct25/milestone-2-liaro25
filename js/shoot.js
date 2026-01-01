// ==================================
// Rock Paper Scissors (Shoot!)
// ==================================

// Get all required elements from the HTML
(function initShoot() {
  const choiceButtons = document.querySelectorAll(".choice-btn");
  const roundResult = document.getElementById("round-result");
  const playerChoiceSpan = document.getElementById("player-choice");
  const computerChoiceSpan = document.getElementById("computer-choice");
  const playerScoreSpan = document.getElementById("player-score");
  const computerScoreSpan = document.getElementById("computer-score");
  const drawSpan = document.getElementById("draw");
  const resetButton = document.getElementById("reset-game");

  // Initial Game State
  const WINNING_SCORE = 3; // First to 3 points wins
  const state = { playerScore: 0, computerScore: 0, draw: 0, gameOver: false };
  
  // Randomly selects one choice (rock, paper, scissors) for the computer 
  function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
  }

  // Converts choice keyword to an emoji for display
  function prettifyChoice(choice) {
    switch (choice) {
      case "rock":
        return "✊";
      case "paper":
        return "✋";
      case "scissors":
        return "✌️";
      default:
        return "-";
    }
  }

  // Determines the result of one round
  // Updates scores and returns the round winner
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
      return "player";
    } else {
      state.computerScore++;
      return "computer";
    }
  }

  // Updates score display based on the latest game state
  function updateScoreboard() {
    playerScoreSpan.textContent = state.playerScore;
    computerScoreSpan.textContent = state.computerScore;
    drawSpan.textContent = state.draw;
  }

  // Checks if either player reaches the winning score and ends the game
  function checkGameOver() {
    if (state.playerScore >= WINNING_SCORE || state.computerScore >= WINNING_SCORE) {
      state.gameOver = true;
      SoundManager?.play(state.playerScore > state.computerScore ? "win" : "lose");
      roundResult.textContent =
  state.playerScore > state.computerScore
    ? `You reached ${WINNING_SCORE} points! 🏆 YOU WIN!`
    : `Computer reached ${WINNING_SCORE} points! Oh No, YOU LOSE!`;
    }
  }
  
  
  // Handles user interaction when a choice button is clicked
  // When player clicks a choice, play one round and show the result
  function handlePlayerChoice(event) {
    if (state.gameOver) {
      roundResult.textContent = "Game is over. Press Reset Game to play again!";
      return;
    }
    SoundManager?.play("click");

    const playerChoice = event.currentTarget.dataset.choice;
    const computerChoice = getComputerChoice();

    playerChoiceSpan.textContent = prettifyChoice(playerChoice);
    computerChoiceSpan.textContent = prettifyChoice(computerChoice);

    const winner = playRound(playerChoice, computerChoice);

    if (winner === "player") SoundManager?.play("win");
    if (winner === "computer") SoundManager?.play("lose");

    roundResult.textContent =
      winner === "draw" ? "It's a draw!" : winner === "player" ? "You win!" : "Computer wins!";

    updateScoreboard();
    checkGameOver();
  }

  // Allows the player to start a new game
  function resetGame() {
    SoundManager?.play("click");
    state.playerScore = 0;
    state.computerScore = 0;
    state.draw = 0;
    state.gameOver = false;

    playerChoiceSpan.textContent = "-";
    computerChoiceSpan.textContent = "-";
    roundResult.textContent = "Let’s play! Make your first move.";

    updateScoreboard();
  }

  // Run the game when the player clicks a button

  choiceButtons.forEach((btn) => btn.addEventListener("click", handlePlayerChoice));
  resetButton.addEventListener("click", resetGame);
  updateScoreboard();
})();
