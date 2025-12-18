// ==================================
// Memory Card (Match!)
// ==================================

// Get all required elements from the HTML
(function initMatch() {
  const cards = document.querySelectorAll(".memory-card");
  const movesCountEl = document.getElementById("movesCount");
  const matchesCountEl = document.getElementById("matchesCount");
  const timeDisplayEl = document.getElementById("timeDisplay");
  const resetBtnMatch = document.getElementById("resetBtn");
  const totalCards = cards.length;
  const totalPairs = Math.floor(totalCards / 2);

// Game Variables
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let moves = 0;
  let matches = 0;
  let seconds = 0;
  let timer = null;

// Starts the game timer on the first player action
  function startTimer() {
    if (timer) return;
    timer = setInterval(() => {
      seconds++;
      const min = Math.floor(seconds / 60); //converting from seconds to minutes
      const sec = seconds % 60;
      timeDisplayEl.textContent = `${min}:${sec.toString().padStart(2, "0")}`;
    }, 1000);
  }

// Stop the time when player finished the game or when game being reset
  function stopTimer() {
    clearInterval(timer);
    timer = null; // startTimer can run again 
  }

// When matching pairs found it will update the score board  
  function updateScoreboard() {
    movesCountEl.textContent = moves;
    matchesCountEl.textContent = `${matches}/${totalPairs}`;
  }

// Reset current turn and unlock the board for the next round
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

// Handle matched card pair: lock cards, update score, and check win condition
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

// Handle mismatched cards: flip them back after a short delay
  function handleMismatch() {
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard();
    }, 800);
  }

//// Handle card click events, manage flipped cards, and update move count  
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

// Fully reset game state, timer, and card interactions
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

// Attach event listeners to cards and reset button
  cards.forEach((card) => card.addEventListener("click", flipCard));
  resetBtnMatch.addEventListener("click", resetGame);

  updateScoreboard();
  shuffleCards();
})();
