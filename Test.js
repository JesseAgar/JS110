const WHITE = '\x1b[0m';
const GREEN = '\x1b[32m';

let apple = GREEN + 'rock' + WHITE;
let rules = {
  rock: {
    winsAgainst: ['scissors'],
  },
  paper: {
    winsAgainst: ['rock'],
  },
  scissors: {
    winsAgainst: ['paper'],
  },
};

console.log(getRandomMoveThatBeats(apple, rules));

function getRandomMoveThatBeats(move, rules) {
  let movesThatWouldWin = [];

  let possibleMoves = Object.keys(rules);
  console.log(possibleMoves);

  possibleMoves.forEach(possibleMove => {
    if (rules[possibleMove].winsAgainst.includes(removeColourTags(move, possibleMoves))) {
      console.log(move);
      movesThatWouldWin.push(removeColourTags(move, possibleMoves));
    }
  });

  return movesThatWouldWin[randomNumBetween(0, movesThatWouldWin.length - 1)];
}


function removeColourTags(string, possibleMoves) {
  for (let index = 0; index < possibleMoves.length; index++) {
    let move = possibleMoves[index];
    if (string.includes(move)) {
      return move;
    }
  }
  return string;
}

function randomNumBetween(min, max) {
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor((Math.random() * (max - min + 1)) + min);
}