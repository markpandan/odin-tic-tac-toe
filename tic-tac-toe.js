function Player(name, selector) {
  let score = 0;

  const getScore = () => score;
  const addScore = () => score++;
  return { name, selector, addScore, getScore };
}

function GameBoard() {
  const boardRow = 3;
  const boardColumn = 3;

  // Initialize the board
  let board = [];
  for (let i = 0; i < boardRow; i++) {
    board[i] = [];
    for (let j = 0; j < boardColumn; j++) {
      board[i].push(null);
    }
  }

  const getBoard = () => board;

  const setBoard = (row, column, value) => (board[row][column] = value);

  // The position argument here requires only two numbers which corresponds to a row, and a column of the board array
  const placeToken = function (playerToken, position) {
    let [row, column] = position.split("");

    // Do nothing if the selected position has a token placed already
    if (board[row][column]) {
      console.log("Token already placed at this position. Enter a new value.");
      return;
    }
    board[row][column] = playerToken;
  };

  // Displays the board in the console
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

  return { placeToken, displayBoard, getBoard, setBoard };
}

export function GameDirector() {
  let gameBoard = GameBoard();
  let players = [Player("Rick", "O"), Player("Morty", "X")];
  let activePlayer = players[0];

  // Stops the game if the winner has already been declared.
  let stopGame = false;

  const switchPlayerTurn = () =>
    (activePlayer = activePlayer === players[0] ? players[1] : players[0]);

  const getActivePlayer = () => activePlayer;

  const getPlayerList = () => players;

  const checkWinner = () => {
    const board = gameBoard.getBoard();

    return (
      (board[0][0] === board[0][1] &&
        board[0][1] === board[0][2] &&
        board[0][0]) ||
      (board[0][0] === board[1][0] &&
        board[1][0] === board[2][0] &&
        board[0][0]) ||
      (board[0][2] === board[1][2] &&
        board[1][2] === board[2][2] &&
        board[0][2]) ||
      (board[2][0] === board[2][1] &&
        board[2][1] === board[2][2] &&
        board[2][0]) ||
      (board[0][0] === board[1][1] &&
        board[1][1] === board[2][2] &&
        board[0][0]) ||
      (board[0][2] === board[1][1] &&
        board[1][1] === board[2][0] &&
        board[0][2]) ||
      (board[1][0] === board[1][1] &&
        board[1][1] === board[1][2] &&
        board[1][0]) ||
      (board[0][1] === board[1][1] &&
        board[1][1] === board[2][1] &&
        board[0][1])
    );
  };

  // Will return a boolean if the function performed its operation or not.
  const playRound = (tokenPosition) => {
    if (stopGame) return false; // Stops the round

    gameBoard.placeToken(activePlayer.selector, tokenPosition);

    if (checkWinner()) {
      console.log(`${activePlayer.name} wins!`);
      activePlayer.addScore();
      console.log("score:" + activePlayer.getScore());
      stopGame = true;

      return false;
    } else {
      switchPlayerTurn();
    }
    return true;
  };

  const resetGame = () => {
    stopGame = false;

    const boardRow = 3;
    const boardColumn = 3;
    for (let row = 0; row < boardRow; row++) {
      for (let column = 0; column < boardColumn; column++) {
        gameBoard.setBoard(row, column, null);
      }
    }
  };

  return {
    playRound,
    getActivePlayer,
    getPlayerList,
    resetGame,
  };
}
