let players = [];
let currentPlayerIndex = 0;
let direction = 1;

// Setup event listeners
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("addPlayerBtn").addEventListener("click", addPlayer);
  document.getElementById("startGameBtn").addEventListener("click", startGame);
});

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
  currentPlayerIndex = 0;
  direction = 1;
  updateDisplay("Game started");
}

// Update display and optionally add to history
function updateDisplay(message) {
  const turnDisplay = document.getElementById("turnDisplay");
  const directionDisplay = document.getElementById("directionDisplay");
  const history = document.getElementById("history");

  turnDisplay.textContent = `${players[currentPlayerIndex]}'s turn`;

  // Update direction arrow for horizontal flow
  directionDisplay.textContent = direction === 1 ? "➡️" : "⬅️";

  // Direction flip animation
  //directionDisplay.classList.remove("direction-flip");
  //void directionDisplay.offsetWidth;
  //directionDisplay.classList.add("direction-flip");

if (message) {
  const li = document.createElement("li");
  li.textContent = message;
  history.insertBefore(li, history.firstChild); // newest at top
}
  
  updatePlayerOrder();
}

// Update the visual player order
function updatePlayerOrder() {
  const orderDiv = document.getElementById("playerOrder");
  orderDiv.innerHTML = '';

  players.forEach((player, index) => {
    const span = document.createElement('div');
    span.textContent = player;
    span.classList.add('player');
    if (index === currentPlayerIndex) {
      span.classList.add('current');
    }
    orderDiv.appendChild(span);
  });

  // Toggle reverse class for visual effect
  if (direction === -1) {
    orderDiv.classList.add('direction-reverse');
  } else {
    orderDiv.classList.remove('direction-reverse');
  }
}

// Game functions
function nextTurn() {
  const currentPlayer = players[currentPlayerIndex];
  currentPlayerIndex = (currentPlayerIndex + direction + players.length) % players.length;
  const nextPlayer = players[currentPlayerIndex];
  updateDisplay(`${currentPlayer} ended their turn → Next: ${nextPlayer}`);
}

function reverseDirection() {
  const currentPlayer = players[currentPlayerIndex];
  // Flip direction
  direction *= -1;
  // Move to the next player in the new direction
  currentPlayerIndex = (currentPlayerIndex + direction + players.length) % players.length;
  const nextPlayer = players[currentPlayerIndex];
  updateDisplay(`${currentPlayer} reversed direction → Next: ${nextPlayer}`);
}

function skipTurn() {
  const currentPlayer = players[currentPlayerIndex];
  currentPlayerIndex = (currentPlayerIndex + 2 * direction + players.length) % players.length;
  const nextPlayer = players[currentPlayerIndex];
  updateDisplay(`${currentPlayer} skipped a turn → Next: ${nextPlayer}`);
}

function resetGame() {
  currentPlayerIndex = 0;
  direction = 1;
  players = [];
  document.getElementById("history").innerHTML = "";
  document.getElementById("playerList").innerHTML = "";
  document.getElementById("playerOrder").innerHTML = "";
  document.getElementById("setup-container").style.display = "block";
  document.getElementById("game-container").style.display = "none";
  updateDisplay("Game reset");
}
