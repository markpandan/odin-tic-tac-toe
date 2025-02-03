import { GameDirector } from "./tic-tac-toe.js";

const player1Name = document.querySelector(".player1-container > h3");
const player1Score = document.querySelector(".player1-container > p");
const player2Name = document.querySelector(".player2-container > h3");
const player2Score = document.querySelector(".player2-container > p");
const status = document.querySelector(".status");
const resetBoard = document.querySelector(".reset-board");

const game = GameDirector();

// Displays the player names and their scores
const players = game.getPlayerList();
player1Name.textContent = players[0].name;
player1Score.textContent = `Score: ${players[0].getScore()}`;
player2Name.textContent = players[1].name;
player2Score.textContent = `Score: ${players[1].getScore()}`;

// Initialize the player's turn status
status.textContent = `${game.getActivePlayer().name}'s turn`;

const ticTacToeBoard = document.querySelector(".board");
ticTacToeBoard.addEventListener("click", (e) => {
  let cell = document.querySelector("#" + e.target.id);

  if (!cell.textContent) {
    let activePlayer = game.getActivePlayer();
    cell.textContent = activePlayer.selector;

    game.playRound(cell.dataset.index);

    // game.playRound(cell.dataset.index) ? cell.textContent = activePlayer.selector : "";
    activePlayer = game.getActivePlayer();
    status.textContent = `${activePlayer.name}'s turn`;
  }
});

resetBoard.addEventListener("click", (e) => {
  game.resetGame();
  const board = document.querySelectorAll(".board > *");
  board.forEach((cell) => (cell.textContent = ""));
});
