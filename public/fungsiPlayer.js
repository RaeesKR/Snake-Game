class Player {
  constructor(name, snake, color, ctx, canvas) {
    this.name = name;
    this.snake = snake;
    this.color = color;
    this.ctx = ctx;
    this.canvas = canvas;
    this.dx = 20;
    this.dy = 0;
    this.score = 0;

    this.growing = false;

    this.gameOver = false;
  } // ======================
  // DRAW SNAKE
  // ======================

  drawSnake() {
    this.snake.forEach((part) => {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(part.x, part.y, 20, 20);
    });
  } // ======================
  // MOVE SNAKE
  // ======================

  moveSnake() {
    let head = {
      x: this.snake[0].x + this.dx,
      y: this.snake[0].y + this.dy,
    };

    if (level !== "Sangat Cepat" && level !== "Super Cepat" && level !== "Super Duper Cepat") {
      if (head.x >= this.canvas.width) head.x = 0;
      if (head.x < 0) head.x = this.canvas.width - 20;

      if (head.y >= this.canvas.height) head.y = 0;
      if (head.y < 0) head.y = this.canvas.height - 20;
    }

    this.snake.unshift(head);

    if (!this.growing) {
      this.snake.pop();
    } else {
      this.growing = false;
    }

    return false;
  } 
  
  // ======================
  // COLLISION BODY
  // ======================
  checkCollision(enemySnake = []) {
    const head = this.snake[0];

    if (level === "Sangat Cepat" || level === "Super Cepat" || level === "Super Duper Cepat") {
      if (
        head.x < 0 ||
        head.x >= this.canvas.width ||
        head.y < 0 ||
        head.y >= this.canvas.height
      ) {
        return true;
      }
    }

    for (let i = 1; i < this.snake.length; i++) {
      if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
        return true;
      }
    }

    for (let i = 0; i < enemySnake.length; i++) {
      if (head.x === enemySnake[i].x && head.y === enemySnake[i].y) {
        return true;
      }
    }

    return false;
  } // ======================
  // KEYBOARD DiRECTION
  // ======================
  changeDirection(keyPressed, controls) {
    const goingUp = this.dy === -20;
    const goingDown = this.dy === 20;
    const goingRight = this.dx === 20;
    const goingLeft = this.dx === -20;

    if (keyPressed === controls.left && !goingRight) {
      this.dx = -20;
      this.dy = 0;
    }
    if (keyPressed === controls.up && !goingDown) {
      this.dx = 0;
      this.dy = -20;
    }
    if (keyPressed === controls.right && !goingLeft) {
      this.dx = 20;
      this.dy = 0;
    }
    if (keyPressed === controls.down && !goingUp) {
      this.dx = 0;
      this.dy = 20;
    }
  }
}
