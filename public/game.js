// ======================
// CANVAS
// ======================
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
// ======================
// PANEL LEVEL
// ======================
const levelPanel = document.getElementById("levelPanel");
const levelText = document.getElementById("levelText");
const scoreText = document.getElementById("scoreText");
const nextLevelBtn = document.getElementById("nextLevelBtn");

// ======================
// FOOD
// ======================
let food = generateFood();

let time = 120;
// ======================
// SCORE
// ======================
let score = 0;

let winner = "";
// ======================
// LEVEL
// ======================
let level = "Easy";
// speed game
let gameSpeed = 250;
// pause level
let pauseLevel = false;
// game over
let gameOver = false;
// ======================
// GENERATE FOOD
// ======================
function generateFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / 20)) * 20,
    y: Math.floor(Math.random() * (canvas.height / 20)) * 20,
  };
}

// ======================
// DRAW SCORE
// ======================
function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "16px Arial";
  ctx.fillText(`${Player1.name}: ${Player1.score}`, 10, 20);
  ctx.fillText(`${Player2.name}: ${Player2.score}`, 710, 20);
  ctx.fillText("Level : " + level, 350, 20);
}

// DRAW TIMER
function drawTimer() {
  ctx.fillStyle = "black";

  ctx.font = "16px Arial";

  ctx.fillText(`Time : ${time}`, 350, 40);
}
// ======================
// LEVEL TRANSITION
// ======================
function showLevelTransition(newLevel) {
  pauseLevel = true;
  levelPanel.classList.remove("hidden");
  levelText.innerText = "LEVEL " + newLevel;
  scoreText.innerText = "P1: " + Player1.score + " | P2: " + Player2.score;
}

// ======================
// NEXT LEVEL BUTTON
// ======================
nextLevelBtn.addEventListener("click", () => {
  pauseLevel = false;
  levelPanel.classList.add("hidden");
  gameLoop();
});

// ======================
// GAME OVER
// ======================

function drawGameOver() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // text winner
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";

  ctx.fillText(`${winner} WIN`, canvas.width / 2, canvas.height / 2);

  // reset align
  ctx.textAlign = "start";
}
const P1_CONTROLS = {
  up: "KeyW",
  down: "KeyS",
  left: "KeyA",
  right: "KeyD",
};
const P2_CONTROLS = {
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
};

// ======================
// UPDATE LEVEL
// ======================
function updateLevel() {
  let currentHighest = Math.max(Player1.score, Player2.score); // EASY
  if (currentHighest <= 25) {
    if (level !== "Easy") {
      showLevelTransition("Easy");
    }
    level = "Easy";
    gameSpeed = 200;
  } else if (currentHighest <= 50) {
    // MEDIUM
    if (level !== "Medium") {
      showLevelTransition("Medium");
    }
    level = "Medium";
    gameSpeed = 150;
  } else if (currentHighest <= 75) {
    // HARD
    if (level !== "Hard") {
      showLevelTransition("Hard");
    }
    level = "Hard";
    gameSpeed = 100;
  } else if (currentHighest <= 100) {
    // Crazy
    if (level !== "Crazy") {
      showLevelTransition("Crazy");
    }
    level = "Crazy";
    gameSpeed = 50;
  } else // Impossible
  {
    if (level !== "Impossible") {
      showLevelTransition("Impossible");
    }
    level = "Impossible";
    gameSpeed = 30;
  }
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 20, 20);
}

// ======================
// CHECK FOOD
// ======================

function checkFood(player) {
  if (player.snake[0].x === food.x && player.snake[0].y === food.y) {
    player.score += 5;

    player.growing = true;

    food = generateFood();

    updateLevel();
  }
}

window.addEventListener("keydown", (event) => {
  Player1.changeDirection(event.code, P1_CONTROLS);
  Player2.changeDirection(event.code, P2_CONTROLS);
});

// PLAYER
const Player1 = new Player(
  "Player 1",
  [
    { x: 200, y: 200 },
    { x: 180, y: 200 },
  ],
  "green",
  ctx,
  canvas,
);
const Player2 = new Player(
  "Player 2",
  [
    { x: 100, y: 100 },
    { x: 120, y: 100 },
  ],
  "blue",
  ctx,
  canvas,
);

// ======================
// GAME LOOP
// ======================
function gameLoop() {
  if (pauseLevel) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (gameOver) {
    drawGameOver();
    return;
  }

  drawFood();

  Player1.moveSnake();
  Player2.moveSnake();

  const p1Kalah = Player1.checkCollision(Player2.snake);
  const p2Kalah = Player2.checkCollision(Player1.snake);

  if (p1Kalah || p2Kalah) {
    gameOver = true;
    winner = p1Kalah ? Player2.name : Player1.name;
  }

  checkFood(Player1);
  checkFood(Player2);

  Player1.drawSnake();
  Player2.drawSnake();
  drawScore();
  drawTimer();

  setTimeout(gameLoop, gameSpeed);
}

// TIMER
setInterval(() => {
  if (!gameOver && !pauseLevel) {
    time--;

    if (time <= 0) {
      gameOver = true;

      // CEK PEMENANG
      if (Player1.score > Player2.score) {
        winner = "PLAYER 1";
      } else if (Player2.score > Player1.score) {
        winner = "PLAYER 2";
      } else {
        winner = "DRAW";
      }
    }
  }
}, 1000);

// ======================
// START GAME
// ======================
gameLoop();
