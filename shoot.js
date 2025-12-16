// ==================================
// Rock Paper Scissors (Shoot!)
// ==================================
(function initShoot() {
  const choiceButtons = document.querySelectorAll(".choice-btn");
  const roundResult = document.getElementById("round-result");
  const playerChoiceSpan = document.getElementById("player-choice");
  const computerChoiceSpan = document.getElementById("computer-choice");
  const playerScoreSpan = document.getElementById("player-score");
  const computerScoreSpan = document.getElementById("computer-score");
  const drawSpan = document.getElementById("draw");
  const resetButton = document.getElementById("reset-game");

  // Not on shoot.html
  if (!choiceButtons.length || !roundResult || !resetButton) return;

  const state = { playerScore: 0, computerScore: 0, draw: 0, gameOver: false };

  function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
  }

  function prettifyChoice(choice) {
    if (choice === "rock") return "✊";
    if (choice === "paper") return "✋";
    if (choice === "scissors") return "✌️";
    return "-";
  }

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

  function updateLeaderboard() {
    playerScoreSpan.textContent = state.playerScore;
    computerScoreSpan.textContent = state.computerScore;
    drawSpan.textContent = state.draw;
  }

  function checkGameOver() {
    if (state.playerScore >= 5 || state.computerScore >= 5) {
      state.gameOver = true;
      roundResult.textContent =
        state.playerScore > state.computerScore
          ? "You reached 5 points! Yeay YOU WIN!"
          : "Computer reached 5 points! Oh No, YOU LOSE!";
    }
  }

  function handlePlayerChoice(event) {
    if (state.gameOver) {
      roundResult.textContent = "Game is over. Press Reset Game to play again!";
      return;
    }

    const playerChoice = event.currentTarget.dataset.choice;
    const computerChoice = getComputerChoice();

    playerChoiceSpan.textContent = prettifyChoice(playerChoice);
    computerChoiceSpan.textContent = prettifyChoice(computerChoice);

    const winner = playRound(playerChoice, computerChoice);

    roundResult.textContent =
      winner === "draw" ? "It's a draw!" : winner === "player" ? "You win!" : "Computer wins!";

    updateLeaderboard();
    checkGameOver();
  }

  function resetGame() {
    state.playerScore = 0;
    state.computerScore = 0;
    state.draw = 0;
    state.gameOver = false;

    playerChoiceSpan.textContent = "-";
    computerChoiceSpan.textContent = "-";
    roundResult.textContent = "Let’s play! Make your first move.";

    updateLeaderboard();
  }

  choiceButtons.forEach((btn) => btn.addEventListener("click", handlePlayerChoice));
  resetButton.addEventListener("click", resetGame);
  updateLeaderboard();
})();
