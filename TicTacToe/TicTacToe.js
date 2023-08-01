const readline = require('readline-sync');

const MESSAGES = {
  askForPlay: 'Please select a square: ',
  endUserWins: 'you win. yay.',
  endCpuWins: 'you lost to a computer that plays random squares',
  endTie: 'tie',
  alreadyFilled: 'that space is already filled',
  invalidInput: 'no',
  spacer: '   ',
};

const VALID_SQUARE_CODES = {
  7: '7ADG',
  8: '8AE',
  9: '9AFH',
  4: '4BD',
  5: '5BEGH',
  6: '6BF',
  1: '1CDH',
  2: '2CE',
  3: '3CFG',
}; /* Letters correspond to rows, columns, and diagonals:
7        |8        |9
        A|        A|        A
    D   G|    E    |H   F
---------|---------|---------
4        |5        |6
        B|        B|        B
    D    |H   E   G|    F
---------|---------|---------
1        |2        |3
        C|        C|        C
H   D    |    E    |    F   G
*/

const SYMBOLS = {
  user: 'o',
  cpu: 'x',
};

startGame();

function startGame() {
  const plays = {
    user: [],
    cpu: [],
  };
  let lastPlayer = 'no one yet';
  console.clear();
  console.log(getBoard());

  while (true) {
    pause(0.8);

    let currentPlayer = whoPlaysNext(lastPlayer);
    let play = getPlay(currentPlayer, plays);
    plays[currentPlayer].push(play);

    board = getBoard(plays.user, plays.cpu);
    console.clear();
    console.log(board);
    if (isWinner(plays[currentPlayer])) {
      print(currentPlayer + ' wins!');
      break;
    } else if (isTie(plays.user, plays.cpu)) {
      print(MESSAGES.endTie);
      break;
    }
    lastPlayer = currentPlayer;
  }

}

function getBoard(userScore = [], cpuScore = []) {
  const cells = {
    c7: ' ',
    c8: ' ',
    c9: ' ',
    c4: ' ',
    c5: ' ',
    c6: ' ',
    c1: ' ',
    c2: ' ',
    c3: ' ',
  };

  userScore.forEach(square => {
    cells['c' + square[0]] = SYMBOLS.user;
  })
  cpuScore.forEach(square => {
    cells['c' + square[0]] = SYMBOLS.cpu;
  })
  let symbolsList = '    USER: ' + SYMBOLS.user + '  CPU: ' + SYMBOLS.cpu + '';

  let board = symbolsList + '\n\n' +
    '   7        |8        |9        ' + '\n' +
    `       ${cells.c7}    |    ${cells.c8}    |    ${cells.c9}    ` + '\n' +
    '            |         |         ' + '\n' +
    '   ---------|---------|---------' + '\n' +
    '   4        |5        |6        ' + '\n' +
    `       ${cells.c4}    |    ${cells.c5}    |    ${cells.c6}    ` + '\n' +
    '            |         |         ' + '\n' +
    '   ---------|---------|---------' + '\n' +
    '   1        |2        |3        ' + '\n' +
    `       ${cells.c1}    |    ${cells.c2}    |    ${cells.c3}    ` + '\n' +
    '            |         |         ' + '\n';

    return board;
}

function whoPlaysNext(lastPlayer) {
  if (lastPlayer === 'user') {
    return 'cpu';
  } else if (lastPlayer === 'cpu') {
    return 'user';
  } else {
    return randomBoolean() ? 'user' : 'cpu';
  }
}

function randomBoolean() {
  let zeroOrOne = randomNumBetween(0, 1);
  return Boolean(zeroOrOne);
}

function getPlay(player, playsObject) {
  let cellsAlreadyFilled = Object.values(playsObject).flat();

  if (player === 'user') {
    return getUserPlay(cellsAlreadyFilled);
  } else if (player === 'cpu') {
    return getCpuPlay(cellsAlreadyFilled);
  }

  return 'invalid player';
}

function getUserPlay(cellsAlreadyFilled) {
  let play;
  while (true) {
    print(MESSAGES.askForPlay);
    play = VALID_SQUARE_CODES[readline.prompt()];

    let isValidCode = Object.values(VALID_SQUARE_CODES).flat().includes(play);
    let hasBeenPlayed = cellsAlreadyFilled.includes(play);

    if (!isValidCode || hasBeenPlayed) {
      continue;
    } else {
      return play;
    }
  }
}

function getCpuPlay(cellsAlreadyFilled) {
  let play;
  while (true) {
    play = getRandomPlay();

    let isValidCode = Object.values(VALID_SQUARE_CODES).flat().includes(play);
    let hasBeenPlayed = cellsAlreadyFilled.includes(play)

    if (!isValidCode || hasBeenPlayed) {
      continue;
    } else {
      return play;
    }
  }
}

function getRandomPlay() {
  return VALID_SQUARE_CODES[String(randomNumBetween(0, 9))];
}

function isWinner(score) {
  let rowsFilled = {};
  let scoreString = score.reduce((acc, string) => {
    return acc += string;
  }, '');

  scoreString.split('').forEach(cellCode => {
    rowsFilled[cellCode] = rowsFilled[cellCode] || 0;
    rowsFilled[cellCode]++;
  });

  return Object.values(rowsFilled).some(row => row >= 3);
}

function isTie(userScore, cpuScore) {
  let cellsAllFilled = userScore.concat(cpuScore).length === 9;
  return cellsAllFilled;
}

function print(message) {
  console.log(MESSAGES.spacer + message);
}

function pause(timeInSeconds) {
  let startTime = new Date().getTime();
  let endTime = startTime + (timeInSeconds * 1000);
  let currentTime = new Date().getTime();
  while (currentTime < endTime) {
    currentTime = new Date().getTime();
  }
}

function randomNumBetween(min, max) {
  return Math.floor((Math.random() * (max + 1 - min)) + min);
}