// ==================================
// Mobile Hamburger Menu (All Pages)
// ==================================
(function initMobileMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden");

    menuBtn.setAttribute("aria-expanded", String(isHidden));
  });

  // Optional: close menu when clicking a link
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
})();

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


// ==================================
// Guess the Number (Guess!)
// ==================================
(function initGuess() {
  const guessInput = document.getElementById("guessInput");
  const submitBtn = document.getElementById("submitBtn");
  const feedback = document.getElementById("feedback");
  const attemptsLeftSpan = document.getElementById("attemptsLeft");
  const gameContainer = document.getElementById("gameContainer");
  const gameOverContainer = document.getElementById("gameOverContainer");
  const gameOverMessage = document.getElementById("gameOverMessage");
  const resetBtnGuess = document.getElementById("resetBtn");
  const previousGuessesList = document.getElementById("guessList");
  const previousGuessesContainer = document.getElementById("previousGuesses");

  // Not on guess.html
  if (!guessInput || !submitBtn || !resetBtnGuess) return;

  let targetNumber;
  let attemptsLeft;
  let gameActive;
  let previousGuesses;

  function initGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attemptsLeft = 10;
    gameActive = true;
    previousGuesses = [];

    guessInput.value = "";
    guessInput.disabled = false;
    submitBtn.disabled = false;
    attemptsLeftSpan.textContent = attemptsLeft;

    gameContainer.classList.remove("hidden");
    gameOverContainer.classList.add("hidden");
    feedback.classList.add("hidden");
    previousGuessesContainer.classList.add("hidden");
    previousGuessesList.innerHTML = "";

    guessInput.focus();
  }

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

    if (type === "success") feedback.classList.add("bg-green-100", "text-green-800");
    else if (type === "error") feedback.classList.add("bg-red-100", "text-red-800");
    else if (type === "high") feedback.classList.add("bg-yellow-100", "text-yellow-800");
    else if (type === "low") feedback.classList.add("bg-blue-100", "text-blue-800");
    else feedback.classList.add("bg-blue-100", "text-blue-800");
  }

  function addToPreviousGuesses(guess) {
    previousGuesses.push(guess);
    const guessSpan = document.createElement("span");
    guessSpan.textContent = guess;
    guessSpan.className = "px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm";
    previousGuessesList.appendChild(guessSpan);
    previousGuessesContainer.classList.remove("hidden");
  }

  function endGame(won) {
    gameActive = false;
    guessInput.disabled = true;
    submitBtn.disabled = true;

    gameContainer.classList.add("hidden");
    gameOverContainer.classList.remove("hidden");

    if (won) {
      const attempts = 10 - attemptsLeft;
      gameOverMessage.innerHTML = `
        <h2 class="text-2xl font-bold text-green-600 mb-2">🏆 You Won!</h2>
        <p class="text-gray-700">You guessed <strong>${targetNumber}</strong> in <strong>${attempts}</strong> attempt${attempts === 1 ? "" : "s"}!</p>
      `;
    } else {
      gameOverMessage.innerHTML = `
        <h2 class="text-2xl font-bold text-red-600 mb-2">💔 Game Over</h2>
        <p class="text-gray-700">The number was <strong>${targetNumber}</strong>. Don't give up!</p>
      `;
    }
  }

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

    showFeedback(guess > targetNumber ? "Too high" : "Too low", guess > targetNumber ? "high" : "low");
    guessInput.value = "";
    guessInput.focus();
  }

  function handleSubmit() {
    if (!gameActive) return;

    const validation = validateInput(guessInput.value);
    if (!validation.isValid) {
      showFeedback(validation.message, "error");
      guessInput.focus();
      return;
    }

    processGuess(validation.number);
  }

  submitBtn.addEventListener("click", handleSubmit);
  guessInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSubmit();
  });
  resetBtnGuess.addEventListener("click", initGame);

  initGame();
})();


// ==================================
// Memory Card (Match!)
// ==================================
(function initMatch() {
  const cards = document.querySelectorAll(".memory-card");
  if (!cards.length) return; // Not on match.html

  const movesCountEl = document.getElementById("movesCount");
  const matchesCountEl = document.getElementById("matchesCount");
  const timeDisplayEl = document.getElementById("timeDisplay");
  const resetBtnMatch = document.getElementById("resetBtn");

  if (!movesCountEl || !matchesCountEl || !timeDisplayEl || !resetBtnMatch) {
    console.error("[MATCH] Missing IDs. Need: movesCount, matchesCount, timeDisplay, resetBtn");
    return;
  }

  const totalCards = cards.length;
  const totalPairs = Math.floor(totalCards / 2);

  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;

  let moves = 0;
  let matches = 0;

  let seconds = 0;
  let timer = null;

  function startTimer() {
    if (timer) return;
    timer = setInterval(() => {
      seconds++;
      const min = Math.floor(seconds / 60);
      const sec = seconds % 60;
      timeDisplayEl.textContent = `${min}:${sec.toString().padStart(2, "0")}`;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timer);
    timer = null;
  }

  function updateScoreboard() {
    movesCountEl.textContent = moves;
    matchesCountEl.textContent = `${matches}/${totalPairs}`;
  }

  function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
  }

  function shuffleCards() {
    cards.forEach((card) => {
      card.style.order = Math.floor(Math.random() * totalCards);
    });
  }

  function handleMatch() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    matches++;
    updateScoreboard();
    resetBoard();

    if (matches === totalPairs) {
      stopTimer();
      setTimeout(() => {
        alert(`🎉 You won!\nMoves: ${moves}\nTime: ${timeDisplayEl.textContent}`);
      }, 250);
    }
  }

  function handleMismatch() {
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard();
    }, 800);
  }

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    startTimer();
    this.classList.add("flip");

    if (!firstCard) {
      firstCard = this;
      return;
    }

    secondCard = this;
    lockBoard = true;

    moves++;
    updateScoreboard();

    const isMatch = firstCard.dataset.card === secondCard.dataset.card;
    if (isMatch) handleMatch();
    else handleMismatch();
  }

  function resetGame() {
    stopTimer();
    moves = 0;
    matches = 0;
    seconds = 0;

    timeDisplayEl.textContent = "0:00";
    updateScoreboard();

    cards.forEach((card) => {
      card.classList.remove("flip");
      card.removeEventListener("click", flipCard);
      card.addEventListener("click", flipCard);
    });

    shuffleCards();
    resetBoard();
  }

  cards.forEach((card) => card.addEventListener("click", flipCard));
  resetBtnMatch.addEventListener("click", resetGame);

  updateScoreboard();
  shuffleCards();
})();
