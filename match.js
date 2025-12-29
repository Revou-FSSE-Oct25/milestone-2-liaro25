// ==================================
// Memory Card (Match!)
// ==================================

// Get all required elements from the HTML
(function initMatch() {
  const movesCountEl = document.getElementById("movesCount");
  const matchesCountEl = document.getElementById("matchesCount");
  const timeDisplayEl = document.getElementById("timeDisplay");
  const resetBtnMatch = document.getElementById("resetBtn");

  // Constants
  const TIMER_INTERVAL_MS = 1000;
  const MATCH_WIN_DELAY_MS = 250;
  const FLIP_BACK_DELAY_MS = 800;
  const CARD_VALUES = ["🍎", "🍌", "🍇", "🍓", "🥐", "🍩", "🍕", "🍔"];
  const TOTAL_PAIRS = CARD_VALUES.length;

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
    }, TIMER_INTERVAL_MS);
  }

// Stop the time when player finished the game or when game being reset
  function stopTimer() {
    clearInterval(timer);
    timer = null; // startTimer can run again 
  }

  const winMessageEl = document.getElementById("winMessage");

function showWinMessage() {
  winMessageEl.innerHTML = `
    <strong>YOU WIN!</strong><br>
    Moves: ${moves}<br>
    Time: ${timeDisplayEl.textContent}
  `;
  winMessageEl.classList.remove("hidden");
}

// When matching pairs found it will update the score board  
  function updateScoreboard() {
    movesCountEl.textContent = moves;
    matchesCountEl.textContent = `${matches}/${TOTAL_PAIRS}`;
  }

  // Generate a shuffled list of pairs (e.g., 8 values -> 16 cards)
function generateCardValues() {
  return [...CARD_VALUES, ...CARD_VALUES].sort(() => Math.random() - 0.5);
}

// Render cards dynamically into #cardGrid and attach click events
function renderCards() {
  const cardGrid = document.getElementById("cardGrid");
  if (!cardGrid) return;

  cardGrid.innerHTML = "";

  const values = generateCardValues();

  values.forEach((value) => {
    const card = document.createElement("div");
    card.className = "memory-card";
    card.dataset.card = value;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front text-3xl sm:text-5xl">${value}</div>
        <div class="card-back text-2xl sm:text-4xl">🍄</div>
      </div>
    `;

    card.addEventListener("click", flipCard);
    cardGrid.appendChild(card);
  });
}

// Reset current turn and unlock the board for the next round
  function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
  }

// Handle matched card pair: lock cards, update score, and check win condition
  function handleMatch() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  matches++;
  updateScoreboard();

  if (matches === TOTAL_PAIRS) {
    stopTimer();
    lockBoard = true; // lock only when game finished
    setTimeout(showWinMessage, MATCH_WIN_DELAY_MS);
    return;
  }

  resetBoard(); // continue to play when game not finished
}

// Handle mismatched cards: flip them back after a short delay
  function handleMismatch() {
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard();
    }, FLIP_BACK_DELAY_MS);
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
  resetBoard();

  winMessageEl.classList.add("hidden");
  winMessageEl.innerHTML = "";
  updateScoreboard();
  renderCards(); // re-generate + shuffle + attach listeners
}


// Attach event listeners to cards and reset button
resetBtnMatch.addEventListener("click", resetGame);
winMessageEl.classList.add("hidden");
winMessageEl.innerHTML = "";

updateScoreboard();
renderCards();
})();

