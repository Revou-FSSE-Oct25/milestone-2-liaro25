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
