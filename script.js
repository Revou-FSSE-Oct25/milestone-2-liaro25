
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
    ties: 0,
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
      state.draws++;
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
    drawSpan.textContent = state.draws;
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
    state.draws = 0;
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
