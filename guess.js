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