function GameBoard() {
  const boardRow = 3;
  const boardColumn = 3;

  let board = [];
  for (let i = 0; i < boardRow; i++) {
    board[i] = [];
    for (let j = 0; j < boardColumn; j++) {
      board[i].push(null);
    }
  }

  // The position argument here requires only two numbers which corresponds to a row, and a column of the board array
  const placeToken = function (playerToken, position) {
    [row, column] = position.split("");

    // Do nothing if the selected position has a token placed already
    if (board[row][column]) {
      console.log("Token already placed at this position. Enter a new value.");
      return;
    }
    board[row][column] = playerToken;
  };

  const getBoard = () => board;

  const displayBoard = () => {
    console.log(
      board.reduce((a, b, index) => {
        let row = b.reduce((a, b, index) => {
          if (b == null) b = "-";
          if (index == 0) return `${b}`;

          return `${a}, ${b}`;
        }, "");

        if (index == 0) return `${row}`;
        return `${a} \n${row}`;
      }, "")
    );
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = ["-", "-", "-"];
    }
  };
  const checkWinner = () => {
    return (
      (board[0][0] == board[0][1]) == board[0][2] ||
      (board[0][0] == board[1][0]) == board[2][0] ||
      (board[0][2] == board[1][2]) == board[2][2] ||
      (board[2][0] == board[2][1]) == board[2][2] ||
      (board[0][0] == board[1][1]) == board[2][2] ||
      (board[0][2] == board[1][1]) == board[2][0]
    );
  };

  return { reset, placeToken, displayBoard, getBoard, checkWinner };
}

function Player(name, selector) {
  let score = 0;
  const addScore = () => score++;
  return { name, selector, addScore };
}

function GameDirector() {
  let board = GameBoard();
  let players = [Player("Rick", 1), Player("Morty", 2)];
  let activePlayer = players[0];

  const switchPlayerTurn = () =>
    (activePlayer = activePlayer === players[0] ? players[1] : players[0]);

  const playRound = () => {
    while (true) {
      let tokenPosition = prompt(`${activePlayer.name}'s turn. Place a token:`);

      board.placeToken(activePlayer.selector, tokenPosition);

      if (board.checkWinner()) {
        console.log(`Congratulations! ${activePlayer.name} is the winner`);
        activePlayer.addScore();
        break;
      }

      switchPlayerTurn();
      board.displayBoard();
    }
  };

  return { playRound };
}

const game = GameDirector();
game.playRound();
