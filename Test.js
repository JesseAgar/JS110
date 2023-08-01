const { question } = require("readline-sync");
const SPACE = " ";
const INITIAL_MARKER = " ";
const HUMAN_MARKER = "X";
const COMPUTER_MARKER = "O";
const SQUARE_WIDTH = 5;
const PADDING = Math.floor((SQUARE_WIDTH - 1) / 2);
const FIRST_PLAYER = ["player", "computer"];
const DIFFICULTY = ["easy", "normal", "hard"];
//adjustable configs
const WINNING_SCORE = 5;
const BOARD_SIZE = 3; //rules stay the same for now

const joinOr = (arr, separator = ", ", lastSeparator = "or") => {
  if (arr.length === 0) return "";
  if (arr.length === 1) return arr[0] + "";
  if (arr.length === 2) return arr.join(` ${lastSeparator} `);

  return arr.slice(0, -1)
    .concat(lastSeparator)
    .join(separator)
    + " "
    + arr[arr.length - 1];
};

const outputRow = (board, rowIndex) => {
  let row = board[rowIndex].join(`${SPACE.repeat(PADDING)}|${SPACE.repeat(PADDING)}`);
  row = row.padStart(row.length + PADDING, SPACE);

  console.log(row);
};

const outputGap = size => {
  let gapLine = [];

  for (let square = 0; square < size; square++) {
    gapLine.push(SPACE.repeat(SQUARE_WIDTH));
  }
  console.log(gapLine.join("|"));
};

const rowSeparator = size => {
  let line = [];

  for (let square = 0; square < size; square++) {
    line.push("-".repeat(SQUARE_WIDTH));
  }
  console.log(line.join("+"));
};

//dynamic board display
const displayBoard = board => {
  let size = board.length;
  console.log('');
  console.log(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}`);
  for (let row = 0; row < size; row++) {
    outputGap(size);
    outputRow(board, row);
    outputGap(size);
    if (row !== size - 1) rowSeparator(size);
  }
  console.log('');
};

const prompt = message => {
  console.log(`=> ${message}`);
};

const initializeBoard = size => {
  let board = [];

  for (let row = 0; row < size; row++) {
    let curRow = [];
    for (let col = 0; col < size; col++) {
      curRow.push(INITIAL_MARKER);
    }
    board.push(curRow);
  }

  return board;
};

const availableRow = board => {
  let rowChoice = [];

  board.forEach((curRow, rowIndex) => {
    let hasEmptySquare = curRow.some(square => square === INITIAL_MARKER);
    if (hasEmptySquare) rowChoice.push(rowIndex);
  });

  return rowChoice;
};

const availableCol = (board, rowIndex) => {
  let colChoice = [];

  board[rowIndex].forEach((square, colIndex) => {
    if (square === INITIAL_MARKER) colChoice.push(colIndex);
  });

  return colChoice;
};

const curColumn = (board, colIndex) => {
  return board.map(curRow => curRow[colIndex]);
};

const diagonals = board => {
  let mainDiagonal = board.map((curRow, colIndex) => curRow[colIndex]);
  let width = board[0].length - 1;
  let antiDiagonal = board.map((curRow, colIndex) => curRow[width - colIndex]);

  return {mainDiagonal, antiDiagonal};
};

const playerChoosesSquare = board => {

  prompt("Please make a move");
  let row;

  while (true) {
    row = question(`Enter row (${joinOr(availableRow(board))}):\n`).trim();
    row = parseInt(row, 10);
    if (availableRow(board).includes(row)) break;

    prompt("Sorry, that's not a valid choice.");
  }

  let col;

  while (true) {
    col = question(`Enter column (${joinOr(availableCol(board, row))}):\n`).trim();
    col = parseInt(col, 10);

    if (availableCol(board, row).includes(col)) break;

    prompt("Sorry, that's not a valid choice.");
  }

  board[row][col] = HUMAN_MARKER;
};

//LS Bonus AI
const findAtRiskSquare = (line, marker) => {
  // this function returns row index if passed in a column,
  // column index if passed in a row.
  // row index if passed in a diagonal.
  let winningLength = line.length - 1;
  let index;
  if (line.filter(mark => mark === marker).length === winningLength) {
    index = line.indexOf(INITIAL_MARKER);
  }
  return index;
};

const atRiskRowMove = (board, marker) => {
  for (let rowIndex of availableRow(board)) {
    let line = board[rowIndex];
    let colIndex = findAtRiskSquare(line, marker);

    if (colIndex >= 0) {
      return [rowIndex, colIndex];
    }
  }
  return null;
};

const atRiskColMove = (board, marker) => {
  let width = board[0].length;
  for (let colIndex = 0; colIndex < width; colIndex++) {
    let line = curColumn(board, colIndex);
    let rowIndex = findAtRiskSquare(line, marker);

    if (rowIndex >= 0) {
      return [rowIndex, colIndex];
    }
  }
  return null;
};

const atRiskDiagonalMove = (board, marker) => {
  let maxColIndex = board[0].length - 1;

  for (let [diagonalName, line] of (Object.entries(diagonals(board)))) {
    let rowIndex = findAtRiskSquare(line, marker);
    let colIndex = rowIndex;

    if (rowIndex >= 0) {
      if (diagonalName === 'antiDiagonal') colIndex = maxColIndex - rowIndex;
      return [rowIndex, colIndex];
    }
  }
  return null;
};

const logicMove = (board, marker) => {
  return atRiskRowMove(board, marker) ||
         atRiskColMove(board, marker) ||
         atRiskDiagonalMove(board, marker);
};

const middleMove = board => {
  let rowIndex = Math.floor(board.length / 2);
  let colIndex = Math.floor(board[0].length / 2);

  if (board[rowIndex][colIndex] === INITIAL_MARKER) return [rowIndex, colIndex];
  return null;
};
//END OF LS Bonus AI

const boardFull = board => {
  return availableRow(board).length === 0;
};

const rowWinner = board => {
  let winner;

  board.forEach(row => {
    if (row.every(mark => mark === HUMAN_MARKER)) winner = 'player';
    else if (row.every(mark => mark === COMPUTER_MARKER)) winner = 'computer';
  });

  return winner;
};

const colWinner = board => {
  let winner;

  board[0].forEach((_, colIndex) => {
    let curCol = curColumn(board, colIndex);

    if (curCol.every(mark => mark === HUMAN_MARKER)) winner = 'player';
    else if (curCol.every(mark => mark === COMPUTER_MARKER)) winner = 'computer';
  });

  return winner;
};

const diagonalWinner = board => {
  let winner;

  Object.values(diagonals(board)).forEach(diagonal => {
    if (diagonal.every(mark => mark === HUMAN_MARKER)) winner = 'player';
    else if (diagonal.every(mark => mark === COMPUTER_MARKER)) winner = 'computer';
  });

  return winner;
};

const detectWinner = board => {
  return rowWinner(board) || colWinner(board) || diagonalWinner(board);
};

const someoneWon = board => {
  return !!detectWinner(board);
};
//MINMAX AI
//Always end in draw if player plays perfectly
const evaluateScore = board => {
  if (rowWinner(board)) {
    if (rowWinner(board) === 'player') return -10;
    else if (rowWinner(board) === 'computer') return 10;
  }

  if (colWinner(board)) {
    if (colWinner(board) === 'player') return -10;
    else if (colWinner(board) === 'computer') return 10;
  }

  if (diagonalWinner(board)) {
    if (diagonalWinner(board) === 'player') return -10;
    else if (diagonalWinner(board) === 'computer') return 10;
  }

  return 0;
};

const minMax = (board, depth, isMax) => {
  let score = evaluateScore(board);
  // adding depth to score so we can find winning path with least moves.
  if (score === 10) return score - depth; //if maximizer won
  if (score === -10) return score + depth; // if minimizer won
  if (boardFull(board)) return 0; // if draw

  let best = (isMax) ? -Infinity : Infinity;
  let marker = (isMax) ? COMPUTER_MARKER : HUMAN_MARKER;

  for (let row of availableRow(board)) {
    for (let col of availableCol(board, row)) {
      board[row][col] = marker;
      if (isMax) best = Math.max(best, minMax(board, depth + 1, !isMax)); // recursive
      else best = Math.min(best, minMax(board, depth + 1, !isMax));
      board[row][col] = INITIAL_MARKER; // backtrack
    }
  }

  return best;
};

const findBestMove = board => {
  let bestScore = -Infinity;

  let [rowIndex, colIndex] = [-1, -1];

  for (let row of availableRow(board)) {
    for (let col of availableCol(board, row)) {

      board[row][col] = COMPUTER_MARKER;
      let moveScore = minMax(board, 0, false); // recursive
      board[row][col] = INITIAL_MARKER; // backtrack

      if (moveScore > bestScore) {
        rowIndex = row;
        colIndex = col;
        bestScore = moveScore;
      }
    }
  }
  return [rowIndex, colIndex];
};
//END OF MINMAX AI

const randomMove = board => {
  let rowChoice = availableRow(board);
  let rowIndex = Math.floor(Math.random() * rowChoice.length);
  let row = rowChoice[rowIndex];

  let colChoice = availableCol(board, row);
  let colIndex = Math.floor(Math.random() * colChoice.length);
  let col = colChoice[colIndex];

  return [row, col];
};

const computerChoosesSquare = (board, difficulty) => {
  let [attack, defense] = [COMPUTER_MARKER, HUMAN_MARKER];
  let move;
  switch (difficulty) {
    case 'normal':
      move = logicMove(board, attack) ||
             logicMove(board, defense) ||
             middleMove(board) ||
             randomMove(board);
      break;
    case 'hard':
      move = middleMove(board) ||
             findBestMove(board);
      break;
    default:
      move = randomMove(board);
  }
  board[move[0]][move[1]] = COMPUTER_MARKER;
};

const chooseSquare = (board, currentPlayer, difficulty) => {
  if (currentPlayer === 'player') playerChoosesSquare(board);
  else computerChoosesSquare(board, difficulty);
};

const alternatePlayer = currentPlayer => {
  let currentPlayerIndex = FIRST_PLAYER.indexOf(currentPlayer);
  //This makes add more players in the future easier.
  let nextPlayerIndex = (currentPlayerIndex + 1) % FIRST_PLAYER.length;

  return FIRST_PLAYER[nextPlayerIndex];
};

const matchWon = score => {
  return Object.values(score).some(points => points >= WINNING_SCORE);
};

const outputScore = score => {
  return `player ${score.player}, computer ${score.computer}`;
};

const playerChoiceMessage = collection => {
  let message = collection.map((player, index) => `${index} for ${player}`)
    .join("\n");

  let randomChoiceMessage = `${collection.length} for random choice`;
  message = "Enter\n" + message + "\n" + randomChoiceMessage + "\n";
  return message;
};

const isValidChoice = (choice, collection) => {
  let chooseRandom = collection.length;
  return !!collection[choice] || choice === chooseRandom;
};

const getUserChoice = (collection, flag) => {
  prompt(`Please choose ${flag} from ${joinOr(collection)}`);

  let message = playerChoiceMessage(collection);
  let choice;
  while (true) {
    choice = parseInt(question(message).trim(), 10);
    if (isValidChoice(choice, collection)) break;

    prompt("Sorry, that's not a valid choice.");
  }

  let randomChoice = Math.floor(Math.random() * collection.length);
  return collection[choice] || collection[randomChoice];
};

const playNewGame = (board, currentPlayer, difficulty) => {
  while (true) {
    if(currentPlayer === 'player') displayBoard(board);
  
    chooseSquare(board, currentPlayer, difficulty);
    currentPlayer = alternatePlayer(currentPlayer);
  
    if (someoneWon(board) || boardFull(board)) break;
  }
  console.clear();
  displayBoard(board);

  if (someoneWon(board)) {
    prompt(`${detectWinner(board)} won!`);
  } else {
    prompt("It is a tie!");
  }
};

const playNewMatch = () => {
  let score = { player: 0,
    computer: 0
  };
  let firstPlayer = getUserChoice(FIRST_PLAYER, "who play first");
  let difficulty = getUserChoice(DIFFICULTY, "mode");
  console.clear();
  while (true) {
    let board = initializeBoard(BOARD_SIZE);
    playNewGame(board, firstPlayer, difficulty);
    if (detectWinner(board)) score[detectWinner(board)] += 1;

    if (matchWon(score)) {
      prompt(`We have a match winner! ${detectWinner(board)} won!`);
      prompt(`The final score is: ${outputScore(score)}`);
      break;
    } else {
      prompt(`The current score is: ${outputScore(score)}`);
    }
  }
};

const validateAnswer = answer => {
  while (!['y', 'n', 'yes', 'no'].includes(answer)) {
    prompt("Sorry, that's not a valid choice.");
    answer = question("Play again? (y or n)\n").toLowerCase();
  }

  return answer;
};

while (true) {
  console.clear();
  playNewMatch();
  let answer = question("Play again? (y or n)\n").toLowerCase();
  answer = validateAnswer(answer);
  if (answer === 'n') break;
}

prompt("Thanks for playing tictactoe!");