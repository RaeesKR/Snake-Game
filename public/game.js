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
// SNAKE
// ======================
let snake = [{x:200,y:200}];
let dx = 20;
let dy = 0;
// ======================
// FOOD
// ======================
let food = generateFood();

// ======================
// SCORE
// ======================
let score = 0;

// ======================
// LEVEL
// ======================
let level = "Easy";
// speed game
let gameSpeed = 150;
// pause level
let pauseLevel = false;
// game over
let gameOver = false;
// ======================
// GENERATE FOOD
// ======================
function generateFood(){
return{
x:Math.floor(Math.random()*20)*20,
y:Math.floor(Math.random()*20)*20
};
}
// ======================
// DRAW SNAKE
// ======================
function drawSnake(){
snake.forEach(part=>{
ctx.fillStyle="green";
ctx.fillRect(part.x,part.y,20,20);
});
}
// ======================
// DRAW FOOD
// ======================
function drawFood(){
ctx.fillStyle="red";
ctx.fillRect(food.x,food.y,20,20);
}
// ======================
// DRAW SCORE
// ======================
function drawScore(){
ctx.fillStyle="black";
ctx.font="16px Arial";
ctx.fillText("Score : "+score,10,20);
ctx.fillText("Level : "+level,300,20);
}

// ======================
// MOVE SNAKE
// ======================
function moveSnake(){

let head = {
x: snake[0].x + dx,
y: snake[0].y + dy
};

// wrap easy-medium
if(level !== "Hard"){

if(head.x >= canvas.width)
head.x = 0;

if(head.x < 0)
head.x = canvas.width - 20;

if(head.y >= canvas.height)
head.y = 0;

if(head.y < 0)
head.y = canvas.height - 20;

}
else{

if(
head.x < 0 ||
head.x >= canvas.width ||
head.y < 0 ||
head.y >= canvas.height
){
gameOver = true;
}

}

snake.unshift(head);

// INI YANG MEMBUAT MEMANJANG
if(!growing){
snake.pop();
}
else{
growing = false;
}

}
// ======================
// CHECK FOOD
// ======================
let growing = false;

function checkFood(){
if(
snake[0].x === food.x &&
snake[0].y === food.y
){
score += 5;
food = generateFood();
growing = true;
updateLevel();
}
}

// ======================
// UPDATE LEVEL
// ======================
function updateLevel(){
// EASY
if(score <= 25){
if(level !== "Easy"){
showLevelTransition("Easy");
}
level = "Easy";
gameSpeed = 250;
}
// MEDIUM
else if(score <= 50){
if(level !== "Medium"){
showLevelTransition("Medium");
}
level = "Medium";
gameSpeed = 200;
}
// HARD
else if(score <= 75){
if(level !== "Hard"){
showLevelTransition("Hard");
}
level = "Hard";
gameSpeed = 150;
}
// Crazy
else if(score <= 100){
if(level !== "Crazy"){
showLevelTransition("Crazy");
}
level = "Crazy";
gameSpeed = 100;
}
// Impossible
else{
if(level !== "Impossible"){
showLevelTransition("Impossible");
}
level = "Impossible";
gameSpeed = 50;
}
}
// ======================
// LEVEL TRANSITION
// ======================
function showLevelTransition(newLevel){
pauseLevel = true;
levelPanel.classList.remove("hidden");
levelText.innerText =
"LEVEL " + newLevel;
scoreText.innerText =
"SCORE: " + score;
}

// ======================
// NEXT LEVEL BUTTON
// ======================
nextLevelBtn.addEventListener("click",()=>{
pauseLevel = false;
levelPanel.classList.add("hidden");
gameLoop();
});
// ======================
// COLLISION BODY
// ======================
function checkCollision(){
const head = snake[0];
for(let i=1;i<snake.length;i++){
if(
head.x === snake[i].x &&
head.y === snake[i].y
){
gameOver = true;
}
}
}
// ======================
// GAME OVER
// ======================
function drawGameOver(){
ctx.fillStyle="black";
ctx.font="30px Arial";
ctx.fillText(
"GAME OVER",
100,
200
);
}
// ======================
// KEYBOARD
// ======================
document.addEventListener("keydown",(event)=>{
const key = event.key;
if(key==="ArrowUp" && dy===0){
dx=0;
dy=-20;
}
else if(key==="ArrowDown" && dy===0){
dx=0;
dy=20;
}
else if(key==="ArrowLeft" && dx===0){
dx=-20;
dy=0;
}
else if(key==="ArrowRight" && dx===0){
dx=20;
dy=0;
}
});

// ======================
// GAME LOOP
// ======================
function gameLoop(){
if(pauseLevel) return;
ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);
if(gameOver){
drawGameOver();
return;
}
moveSnake();
checkFood();
checkCollision();
drawSnake();
drawFood();
drawScore();
setTimeout(gameLoop,gameSpeed);
}

// ======================
// START GAME
// ======================
gameLoop();

