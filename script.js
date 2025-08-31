// Player setup
let players = ["Player 1", "Player 2", "Player 3", "Player 4"];
let currentPlayerIndex = 0;
let direction = 1; // 1 = clockwise, -1 = counter-clockwise

// Update the displays and optionally add a history entry
function updateDisplay(message) {
  const turnDisplay = document.getElementById("turnDisplay");
  const directionDisplay = document.getElementById("directionDisplay");
  const history = document.getElementById("history");

  // Show current player
  turnDisplay.textContent = `${players[currentPlayerIndex]}'s turn`;

  // Show direction
  directionDisplay.textContent =
    direction === 1 ? "Direction: Clockwise ⟳" : "Direction: Counter-Clockwise ⟲";

  // Trigger subtle flip animation on direction
  directionDisplay.classList.remove("direction-flip");
  void directionDisplay.offsetWidth; // reflow
  directionDisplay.classList.add("direction-flip");

  // Add to history if provided
  if (message) {
    const li = document.createElement("li");
    li.textContent = message;
    history.appendChild(li);
    history.scrollTop = history.scrollHeight; // auto-scroll
  }
}

// Move to next player
function nextTurn() {
  currentPlayerIndex = (currentPlayerIndex + direction + players.length) % players.length;
  updateDisplay("Next turn");
}

// Reverse direction
function reverseDirection() {
  direction *= -1;
  updateDisplay("Direction reversed");
}

// Skip a player
function skipTurn() {
  currentPlayerIndex = (currentPlayerIndex + 2 * direction + players.length) % players.length;
  updateDisplay("Turn skipped");
}

// Reset the game
function resetGame() {
  currentPlayerIndex = 0;
  direction = 1;
  document.getElementById("history").innerHTML = "";
  updateDisplay("Game reset");
}

// Initial display
updateDisplay();
