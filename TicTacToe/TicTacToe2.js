const readline = require('readline-sync');
const squareSize = 3;
const messages = {
  askForPlay: 'Please select a square: ',
  endUserWins: 'you win. yay.',
  endCpuWins: 'you lost to a computer that plays random squares',
  endTie: 'tie',
  alreadyFilled: 'that space is already filled',
  invalidInput: 'no',
  spacer: '   ',
};

const symbols = {
  user: 'o',
  cpu: 'x',
  cpu2: '+',
};

const blankBoard = {
  7: ' ',
  8: ' ',
  9: ' ',
  4: ' ',
  5: ' ',
  6: ' ',
  1: ' ',
  2: ' ',
  3: ' ',
};

const winningRows = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['7', '4', '1'],
  ['8', '5', '2'],
  ['9', '6', '3'],
  ['7', '5', '3'],
  ['9', '5', '1'],
];

playGame();

function playGame() {
  let board = getFreshBoard();
  printBoard(board);
  let lastPlayer = coinToss();

  while (!hasWonTTT(lastPlayer, board) && !boardIsFull(board)) {
    pause(0.8);
    let currentPlayer = getNextPlayer(lastPlayer);

    let play = getPlay(currentPlayer, board);

    board = updateBoard(board, currentPlayer, play);
    printBoard(board);

    lastPlayer = currentPlayer;
  }
  pause(0.8);
  let winner = getWinner(board);
  printWinner(winner);
}

function getFreshBoard() {
  return Object.assign({}, blankBoard);
}

function updateBoard(oldBoard, player, play) {
  let updatedBoard = Object.assign({}, oldBoard);
  updatedBoard[play] = symbols[player];
  return updatedBoard;
}

function hasWonTTT(player, board) {
  let playerSquares = getPlayerFilledSquareNumbers(board, player);
  return squareNumbersAreWinning(playerSquares);
}

function squareNumbersAreWinning(playersNumbers) {
  for (let index = 0; index < winningRows.length; index++) {
    let possibleWinRow = winningRows[index];
    if (possibleWinRow.every(num => playersNumbers.includes(num))) {
      return true;
    }
  }
  return false;
}

function getPlayerFilledSquareNumbers(board, player) {
  return Object.entries(board)
    .map(squareAndSymbol => {
      let symbol = squareAndSymbol[1];
      let squareNumber = squareAndSymbol[0];
      if (symbol === symbols[player]) {
        return squareNumber;
      } else {
        return false;
      }
    })
    .filter(filledOrNot => filledOrNot);
}

function getEmptySquareNumbers(board) {
  return Object.entries(board)
    .map(squareAndSymbol => {
      let symbol = squareAndSymbol[1];
      let squareNumber = squareAndSymbol[0];
      if (symbol === ' ') {
        return squareNumber;
      } else {
        return false;
      }
    })
    .filter(filledOrNot => filledOrNot);
}

function boardIsFull(board) {
  return Object.values(board).every(square => square !== ' ');
}

function getWinner(board) {
  if (hasWonTTT('user', board)) {
    return 'user';
  } else if (hasWonTTT('cpu', board)) {
    return 'cpu';
  } else {
    return 'nobody';
  }
}

function printBoard(board) {
  console.clear();
  let symbolsList = '          USER: ' + symbols.user + '  CPU: ' + symbols.cpu1 + '';

  let printableBoard = symbolsList + '\n\n' +
    '   7        |8        |9        ' + '\n' +
    `       ${board['7']}    |    ${board['8']}    |    ${board['9']}    ` + '\n' +
    '            |         |         ' + '\n' +
    '   ---------|---------|---------' + '\n' +
    '   4        |5        |6        ' + '\n' +
    `       ${board['4']}    |    ${board['5']}    |    ${board['6']}    ` + '\n' +
    '            |         |         ' + '\n' +
    '   ---------|---------|---------' + '\n' +
    '   1        |2        |3        ' + '\n' +
    `       ${board['1']}    |    ${board['2']}    |    ${board['3']}    ` + '\n' +
    '            |         |         ' + '\n';

  console.log(printableBoard);
}

function pause(timerLengthInSeconds) {
  let currentTime = getCurrentDateInSeconds();
  let endTime = currentTime + timerLengthInSeconds;
  while (currentTime < endTime) {
    currentTime = getCurrentDateInSeconds();
    continue;
  }
}

function getCurrentDateInSeconds() {
  return new Date().getTime() / 1000;
}

function randomBoolean() {
  let zeroOrOne = randomNumBetween(0, 1);
  return Boolean(zeroOrOne);
}

function getNextPlayer(lastPlayer) {
  if (lastPlayer === 'user') {
    return 'cpu';
  } else if (lastPlayer === 'cpu') {
    return 'user';
  } else {
    return NaN;
  }
}

function getPlay(player, board) {
  if (player === 'user') {
    return getUserPlay(board);
  } else if (player === 'cpu') {
    return getCpuPlay(board);
  } else {
    return NaN;
  }
}

function getUserPlay(board) {
  let play;
  while (true) {
    print(messages.askForPlay + '(' + printSquareOptions(board) + '):');
    play = readline.prompt();

    if (isValidPlay(board, play)) {
      return play;
    }
  }
}

function getCpuPlay(board) {
  let play;
  while (true) {
    play = getRandomPlay();
    if (isValidPlay(board, play)) {
      return play;
    }
  }
}

function getRandomPlay() {
  return String(randomNumBetween(0, 9));
}

function getSmartPlay(board, player) {
  let winningRowsWithPlays = getWinningRowsWithPossiblePlays(board);
  let imminentWinSquare = getImminentWinSquare(winningRowsWithPlays, player);
  let imminentWinSquareAvailable = Boolean(imminentWinSquare);
  if (imminentWinSquareAvailable) {
    return imminentWinSquare;
  }
}

function getImminentWinSquare(winningRowsWithPlays, player) {
  for (let rowIndex = 0; rowIndex < winningRowsWithPlays.length; rowIndex++) {
    let row = winningRowsWithPlays[rowIndex];
    let symbolCount = row.filter(square => square === symbols[player]).length;

    if (symbolCount[symbols[player]] === squareSize - 1) {
      let imminentWinSquare = row.filter(square => {
        let isASymbol = Object.values(symbols).includes(square);
        return !isASymbol;
      })[0];
      return imminentWinSquare;
    }
  }
  return undefined;
}

// getPlayerFilledSquareNumbers(board, player)
// ['7', '8', '9']
// ['4', '5', '6']
// ['1', '2', '3']
// ['7', '4', '1']
// ['8', '5', '2']
// ['9', '6', '3']
// ['7', '5', '3']
// ['9', '5', '1']

// imminentWinSelf (if a winningrow has 2 of my symbols and a free space)
// imminentWinEnemy (if a winningrow has 2 of enemy symbols and a free space)
// If unblockedEnemy, remaining squares (move there score + 1)
// if unblockedSelf (move there score + 1)

function getWinningRowsWithPossiblePlays(board) {
  let cpuFilledSquares = getPlayerFilledSquareNumbers(board, 'cpu');
  let opponentFilledSquares = getPlayerFilledSquareNumbers(board, 'user');
  let winningRowsCopy = [];
  winningRows.forEach(row => {
    winningRowsCopy.push(row.slice().map(square => {

      if (cpuFilledSquares.includes(square)) {
        return symbols.cpu;
      } else if (opponentFilledSquares.includes(square)) {
        return symbols.user;
      } else {
        return square;
      }
    }));
  });

  let winningRowsWithPossiblePlays = winningRowsCopy.filter(row => {
    return !row.every(square => Object.values(symbols).includes(square));
  });
  return winningRowsWithPossiblePlays;
}

function printSquareOptions(board) {
  let squareOptionsMessage = '';
  let filledSquareNumbers = getEmptySquareNumbers(board);

  for (let index = 0; index < filledSquareNumbers.length; index++)  {
    let filledSquareNumber = filledSquareNumbers[index];

    if (filledSquareNumbers.length === 1) {
      squareOptionsMessage += filledSquareNumber;
    } else if (index === filledSquareNumbers.length - 1) {
      squareOptionsMessage += 'or ' + filledSquareNumber;
    } else {
      squareOptionsMessage += filledSquareNumber + ', ';
    }
  }
  return squareOptionsMessage;
}

function isValidPlay(board, play) {
  let isAPossiblePlay = Object.keys(board).includes(play);
  let hasBeenPlayed = board[play] !== ' ';
  return isAPossiblePlay && !hasBeenPlayed;
}

function coinToss() {
  return randomBoolean() ? 'user' : 'cpu';
}

function randomNumBetween(min, max) {
  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor((Math.random() * (max + 1 - min)) + min);
}

function print(message) {
  console.log(messages.spacer + message);
}

function printWinner(winner) {
  console.log(winner + ' wins!');
}

