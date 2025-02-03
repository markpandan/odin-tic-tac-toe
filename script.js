import { GameDirector } from "./tic-tac-toe.js";

const player1Name = document.querySelector(".player1-container > h3");
const player1Score = document.querySelector(".player1-container > p");
const player2Name = document.querySelector(".player2-container > h3");
const player2Score = document.querySelector(".player2-container > p");
const status = document.querySelector(".status");
const resetBoard = document.querySelector(".reset-board");

const game = GameDirector();
function updateScore(name, score) {
  if (player1Name.textContent === name) {
    player1Score.textContent = `Score: ${score}`;
  } else if (player2Name.textContent === name) {
    player2Score.textContent = `Score: ${score}`;
  }
}

// Displays the player names and their scores
const players = game.getPlayerList();
player1Name.textContent = players[0].name;
player1Score.textContent = `Score: ${players[0].getScore()}`;
player2Name.textContent = players[1].name;
player2Score.textContent = `Score: ${players[1].getScore()}`;

// Initialize the player's turn status
status.textContent = `${game.getActivePlayer().name}'s turn`;

const ticTacToeBoard = document.querySelector(".board");
let updateBoard = true;

let roundCount = 0;
ticTacToeBoard.addEventListener("click", (e) => {
  if (!updateBoard) return;

  let cell = document.querySelector("#" + e.target.id);
  if (!cell.textContent) {
    let activePlayer = game.getActivePlayer();
    cell.textContent = activePlayer.selector;

    if (game.playRound(cell.dataset.index)) {
      activePlayer = game.getActivePlayer();
      status.textContent = `${activePlayer.name}'s turn`;
      roundCount++;
      if (roundCount >= 9) {
        status.textContent = `It's a tie!`;
        updateBoard = false;
      }
    } else {
      // When the method inside this "if" statement will return false if a winner has been declared. Signaling that the round alreadn ended.
      activePlayer = game.getActivePlayer();
      status.textContent = `${activePlayer.name} wins!`;
      updateScore(activePlayer.name, activePlayer.getScore());
      updateBoard = false;
    }
  }
});

resetBoard.addEventListener("click", (e) => {
  game.resetGame();
  const board = document.querySelectorAll(".board > *");
  board.forEach((cell) => (cell.textContent = ""));
  updateBoard = true;
  roundCount = 0;

  status.textContent = `${game.getActivePlayer().name}'s turn`;
});
