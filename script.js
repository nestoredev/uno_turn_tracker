let players = [];
let currentPlayerIndex = 0;
let direction = 1; // 1 = clockwise, -1 = counter-clockwise

// Add player from input
function addPlayer() {
  const nameInput = document.getElementById("playerName");
  const name = nameInput.value.trim();
  if (!name) return;

  players.push(name);

  const li = document.createElement("li");
  li.textContent = name;
  document.getElementById("playerList").appendChild(li);

  nameInput.value = "";
}

// Start the game
function startGame() {
  if (players.length < 2) {
    alert("Enter at least 2 players!");
    return;
  }
  document.getElementById("setup-container").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  updateDisplay("Game started");
}

// Update displays and add to history
function updateDisplay(message) {
  const turnDisplay = document.getElementById("turnDisplay");
  const directionDisplay = document.getElementById("directionDisplay");
  const history = document.getElementById("history");

  turnDisplay.textContent = `${players[currentPlayerIndex]}'s turn`;
  directionDisplay.textContent =
    direction === 1 ? "Direction: Clockwise ⟳" : "Direction: Counter-Clockwise ⟲";

  // Trigger direction flip animation
  directionDisplay.classList.remove("direction-flip");
  void directionDisplay.offsetWidth;
  directionDisplay.classList.add("direction-flip");

  // Add to history if message provided
  if (message) {
    const li = document.createElement("li");
    li.textContent = message;
    history.appendChild(li);
    history.scrollTop = history.scrollHeight; // auto-scroll
  }
}

// Turn functions
function nextTurn() {
  currentPlayerIndex = (currentPlayerIndex + direction + players.length) % players.length;
  updateDisplay("Next turn");
}

function reverseDirection() {
  direction *= -1;
  updateDisplay("Direction reversed");
}

function skipTurn() {
  currentPlayerIndex = (currentPlayerIndex + 2 * direction + players.length) % players.length;
  updateDisplay("Turn skipped");
}

function resetGame() {
  currentPlayerIndex = 0;
  direction = 1;
  players = [];
  document.getElementById("history").innerHTML = "";
  document.getElementById("playerList").innerHTML = "";
  document.getElementById("setup-container").style.display = "block";
  document.getElementById("game-container").style.display = "none";
  updateDisplay("Game reset");
}
