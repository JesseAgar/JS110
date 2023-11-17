const readline = require('readline-sync');

const HAND_VALUE_TARGET = 21;
const WINS_NEEDED = 2; // WINS_NEEDED >= 1

const CPUS_NAME = 'CPU ';
const USER_NAME = 'Meat Elemental';
const NUMBER_OF_USERS = 1; // 1 or 0
const NUMBER_OF_CPUS = 2; // Between 1 and 4
const NUMBER_OF_PLAYERS = NUMBER_OF_USERS + NUMBER_OF_CPUS;
const USER_IS_PRESENT = NUMBER_OF_USERS > 0;

const SUITS = ['♠', '◆', '♣', '♥'];
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const MASTER_DECK = makeMasterDeck(SUITS, VALUES);
const AI_TARGET_SCORE = HAND_VALUE_TARGET - 4;
const INITIAL_DRAW_NUMBER = Math.floor(HAND_VALUE_TARGET / 10);
const NUMBER_CARDS_HIDDEN = 1;
const PAUSE_BETWEEN_DEALT_CARDS = 0.5 * ( 1 / INITIAL_DRAW_NUMBER);

const INPUT_TEXT_COLOUR = '\x1b[93m';
const WINNER_TEXT_COLOUR = '\x1b[32m';
const DEFAULT_TEXT_COLOUR = '\x1b[0m';
const TIE_BUST_TEXT_COLOUR = '\x1b[91m';

const MESSAGES = {
  playAgain: 'Do you want to play again?',
  yesOrNo: '(y)es or (n)o',
  numberOfGames: 'Hand Value Target: ' + HAND_VALUE_TARGET,
  numberOfWins: 'First to ' + WINS_NEEDED + ' win(s)!',
  goodbye: 'Goodbye',
  shuffling: '\n\n                        SHUFFLING',
  pressAnyKey: INPUT_TEXT_COLOUR
    + '\n\n   ⟨  press (most) any key to continue  ⟩'
    + DEFAULT_TEXT_COLOUR,
  hitOrStay: INPUT_TEXT_COLOUR + '    (h)it or (s)tay?' + DEFAULT_TEXT_COLOUR,
  win: ' wins!',
  nextRound: INPUT_TEXT_COLOUR
    + '\n⟨  press (most) any key for next round  ⟩'
    + DEFAULT_TEXT_COLOUR,
};

const FANCY_WELCOME_MESSAGE = `╦ ╦┌─┐┬  ┌─┐┌─┐┌┬┐┌─┐  ╔╦╗┌─┐
║║║├┤ │  │  │ ││││├┤    ║ │ │
╚╩╝└─┘┴─┘└─┘└─┘┴ ┴└─┘   ╩ └─┘` + '\n' +
    `  ██████  ██       █████   ██████ ██   ██      ██  █████   ██████ ██   ██ 
  ██   ██ ██      ██   ██ ██      ██  ██       ██ ██   ██ ██      ██  ██  
  ██████  ██      ███████ ██      █████        ██ ███████ ██      █████   
  ██   ██ ██      ██   ██ ██      ██  ██  ██   ██ ██   ██ ██      ██  ██  
  ██████  ███████ ██   ██  ██████ ██   ██  █████  ██   ██  ██████ ██   ██ `;

const SCOREBOARD_TEMPLATE =
  makeScoreboardTemplate(NUMBER_OF_CPUS, NUMBER_OF_USERS);
const HAND_VALUES_TEMPLATE =
  makeHandValuesTemplate(NUMBER_OF_CPUS, NUMBER_OF_USERS);
const HANDS_TEMPLATE = makeHandsTemplate(NUMBER_OF_CPUS, NUMBER_OF_USERS);
const PLAYER_HANDS_ARE_VISIBLE_TEMPLATE =
  makePlayerHandsAreVisibleTemplate(NUMBER_OF_CPUS, NUMBER_OF_USERS);

const CARD_FRONT = {
  top: function() {
    return '  _____ ';
  },
  topMiddle: function() {
    return ' |     |';
  },
  middle: function(card) {
    return ' | ' + card + ' |';
  },
  bottomMiddle: function() {
    return ' |     |';
  },
  bottomMiddle2: function() {
    return ' |     |';
  },
  bottom: function() {
    return '  ¯¯¯¯¯ ';
  },
};

const CARD_BACK = {
  top: function() {
    return '  _____ ';
  },
  topMiddle: function() {
    return ' | ◇ ◇ |';
  },
  middle: function() {
    return ' |◇ ◇ ◇|';
  },
  bottomMiddle: function() {
    return ' | ◇ ◇ |';
  },
  bottomMiddle2: function() {
    return ' |◇ ◇ ◇|';
  },
  bottom: function() {
    return '  ¯¯¯¯¯ ';
  },
};

throwErrorsIfGameParametersAreWrong();

//! START
printOpeningScreen();

while (true) {
  //! SET/RESET SCOREBOARD, DECK AND HANDS
  let scoreBoard = Object.assign({}, SCOREBOARD_TEMPLATE);

  do {
    printShufflingMessage(scoreBoard);

    let deck = shuffled(MASTER_DECK.slice());
    let hands = JSON.parse(JSON.stringify(HANDS_TEMPLATE));
    let playerHandsAreVisible = Object.assign({},
      PLAYER_HANDS_ARE_VISIBLE_TEMPLATE);
    let handValues = Object.assign({}, HAND_VALUES_TEMPLATE);

    //! INITIAL CARD DRAW
    for (let drawRound = 0; drawRound < INITIAL_DRAW_NUMBER; drawRound++) {
      for (let player in hands) {
        let topCardOfDeck = drawCard(deck);

        hands[player].push(topCardOfDeck);
        handValues[player] = getHandValue(hands[player]);

        pause(PAUSE_BETWEEN_DEALT_CARDS);

        printTableTop(hands, playerHandsAreVisible, handValues, scoreBoard);
      }
    }

    //! USER TURN
    while (true) {
      pause(0.8);
      if (!USER_IS_PRESENT) break;
      if (handValues[USER_NAME] === 'BUST') break;
      if (!userWantsToHit()) break;

      printTableTop(hands, playerHandsAreVisible, handValues, scoreBoard);

      let topCardOfDeck = drawCard(deck);

      hands[USER_NAME].push(topCardOfDeck);
      handValues[USER_NAME] = getHandValue(hands[USER_NAME]);

      pause(0.5);

      printTableTop(hands, playerHandsAreVisible, handValues, scoreBoard);
    }

    printTableTop(hands, playerHandsAreVisible, handValues, scoreBoard);

    //! CPU TURNS
    for (let CPUNumber = 1; CPUNumber <= NUMBER_OF_CPUS; CPUNumber++) {
      if (USER_IS_PRESENT) pause(0.7);

      let CPUPlayer = CPUS_NAME + CPUNumber;
      playerHandsAreVisible[CPUPlayer] = true;

      printTableTop(hands, playerHandsAreVisible, handValues, scoreBoard);

      let handValueBelowSafeTarget = handValues[CPUPlayer] < AI_TARGET_SCORE;

      while (handValueBelowSafeTarget) {
        let topCardOfDeck = drawCard(deck);

        hands[CPUPlayer].push(topCardOfDeck);
        handValues[CPUPlayer] = getHandValue(hands[CPUPlayer]);
        handValueBelowSafeTarget = handValues[CPUPlayer] < AI_TARGET_SCORE;

        pause(0.7);

        printTableTop(hands, playerHandsAreVisible, handValues, scoreBoard);
      }
      pause(0.5);
    }
    pause(0.7);

    //! ROUND END
    let roundWinner = getRoundWinner(handValues);

    printTableTop(
      hands,
      playerHandsAreVisible,
      handValues,
      scoreBoard,
      roundWinner);

    pause(0.7);

    scoreBoard[roundWinner]++;

    printTableTop(
      hands,
      playerHandsAreVisible,
      handValues,
      scoreBoard,
      roundWinner);

    pause(0.4);

  } while (!someoneWonTournament(scoreBoard) && anyKeyForNextRound());

  //! TOURNAMENT END
  print(getTournamentWinner(scoreBoard) + MESSAGES.win);

  if (wantToPlayAgain()) break;
}

console.clear();
print(MESSAGES.goodbye);
//! END

//******************\\
//* GAME FUNCTIONS *\\
//******************\\
function drawCard(deck) {
  if (deck.length <= 1) {
    let newDeck = shuffled(MASTER_DECK.slice());
    deck.push(...newDeck);
  }

  return deck.pop();
}

function shuffled(inputDeck, numOfShuffles = 5) {
  let copiedDeck = inputDeck.slice();
  let shuffles = 0;

  while (shuffles < numOfShuffles) {
    copiedDeck.sort(() => {
      return randomNumBetween(-1, 1);
    });
    copiedDeck = cutTheDeck(copiedDeck);
    shuffles++;
  }

  return copiedDeck;
}

function cutTheDeck(inputDeck) {
  let copiedDeck = inputDeck.slice();
  let middleIndex = Math.floor(copiedDeck.length / 2);
  let halfTheDeck = copiedDeck.splice(0, middleIndex);

  return copiedDeck.concat(halfTheDeck);
}

function someoneWonTournament(scoreBoard) {
  return Object.values(scoreBoard).some(score => score >= WINS_NEEDED);
}

function getTournamentWinner(scoreBoard) {
  for (let playerName in scoreBoard) {
    let playerScore = scoreBoard[playerName];

    if (playerScore >= WINS_NEEDED) {
      return playerName;
    }
  }
  return null;
}


//****************\\
//* QUERY PLAYER *\\
//****************\\
function wantToPlayAgain() {
  print(MESSAGES.playAgain);

  return getYesOrNo();
}

function getYesOrNo() {
  print(MESSAGES.yesOrNo);

  let yesOrNo = readline.keyIn('', {limit: 'yn'}).toLowerCase();

  return yesOrNo === 'y';
}

function userWantsToHit() {
  print(MESSAGES.hitOrStay);

  let userWantsToHit = readline.keyIn('', {limit: 'hs'}).toLowerCase() === 'h';

  return userWantsToHit;
}

function anyKeyForNextRound() {
  print(MESSAGES.nextRound);

  if (USER_IS_PRESENT) {
    readline.keyIn();
  }
  return true;
}


//************************\\
//* CALCULATE HAND VALUE *\\
//************************\\
function getHandValue(playerHand) {
  let handValue = 0;
  let aceCount = 0;

  playerHand.forEach(card => {
    if (isAce(card)) {
      aceCount++;
      return;
    }

    handValue += getNonAceCardValue(card);
  });

  handValue += getAcesValues(aceCount, handValue);
  handValue = isBusted(handValue) ? 'BUST' : handValue;

  return handValue;
}

function isBusted(playerHandScore) {
  return playerHandScore > HAND_VALUE_TARGET;
}

function getNonAceCardValue(card) {
  let cardValue = card.replace(/[\W]/g, '');

  switch (cardValue) {
    case 'J':
    case 'Q':
    case 'K':
      return 10;
    case 'A':
      break;
    default:
      return Number(cardValue);
  }

  return NaN;
}

function getAcesValues(numberOfAces, handValue) {
  let acesOne = 0;
  let acesEleven = numberOfAces;

  while (acesEleven > 0) {
    let acesValue = (acesOne * 1) + (acesEleven * 11);
    let totalValue = acesValue + handValue;
    if (totalValue <= HAND_VALUE_TARGET) break;
    acesOne++;
    acesEleven--;
  }

  return (acesOne * 1) + (acesEleven * 11);
}

function isAce(card) {
  let cardValue = card.replace(/[\W]/gi, '');

  return cardValue === 'A';
}


//******************\\
//* PRINT TABLETOP *\\
//******************\\
function printTableTop(hands, handIsVisible, handValues, scoreBoard, winner) {
  console.clear();
  printScoreBoard(scoreBoard, winner);

  for (let CPUPlayerNum = 1; CPUPlayerNum <= NUMBER_OF_CPUS; CPUPlayerNum++) {
    let cpuName = CPUS_NAME + CPUPlayerNum;
    let playerName = (CPUS_NAME + CPUPlayerNum);

    if (handIsVisible[cpuName] || NUMBER_OF_USERS === 0) {
      printCardsFaceUp(playerName, hands[cpuName], handValues);
    } else {
      printCardsFaceDown(playerName, hands[cpuName]);
    }

  }

  if (NUMBER_OF_USERS) {
    print('\n');
    printCardsFaceUp(USER_NAME, hands[USER_NAME], handValues);
  }
}

function printCardsFaceUp(playerName, playerHand, handValues) {
  let infinityCardsVisible = Infinity;

  return printCardsFaceDown(
    playerName,
    playerHand,
    infinityCardsVisible,
    handValues
  );
}

function printCardsFaceDown(
  playerName,
  playerHand = [],
  numCardsVisible = INITIAL_DRAW_NUMBER - NUMBER_CARDS_HIDDEN,
  handValues
) {
  let cardSections = Object.keys(CARD_FRONT);
  let hand = [];
  cardSections.forEach((section,index) => {
    hand = addNameToSection(hand, section, playerName,
      numCardsVisible, handValues);
    hand = addCardsToSection(hand, section, playerHand, numCardsVisible);

    let notBottomCardSection = index < cardSections.length - 1;

    if (notBottomCardSection) {
      hand.push('\n');
    }
  });

  print(hand.join(''));
}

function addCardsToSection(inputHand, section, playerHand, numCardsVisible) {
  let outputHand = inputHand.slice();

  playerHand.forEach((card, index) => {
    if (index < numCardsVisible) {
      outputHand.push(CARD_FRONT[section](card));
    } else {
      outputHand.push(CARD_BACK[section]());
    }
  });

  return outputHand;
}

function addNameToSection(inputHand, section, playerName,
  numCardsVisible, handValues) {
  let outputPrintableHand = inputHand.slice();
  const SPACES_AFTER_NAME = 1;
  let nameLength = playerName.length;
  let printableName = playerName.padEnd(nameLength + SPACES_AFTER_NAME, ' ');
  let namePadding = makeSpaces(printableName.length);
  let valuesAreVisible = numCardsVisible === Infinity;
  let handValue = valuesAreVisible ? handValues[playerName] : null;

  if (section === 'middle') {
    outputPrintableHand.push(printableName);
  } else if (valuesAreVisible && section === 'bottomMiddle') {
    outputPrintableHand.push(`--`.padEnd(printableName.length, ' '));
  } else if (valuesAreVisible && section === 'bottomMiddle2') {
    outputPrintableHand.push(`${handValue}`.padEnd(printableName.length, ' '));
  } else {
    outputPrintableHand.push(namePadding);
  }

  return outputPrintableHand;
}

function printScoreBoard(scoreBoard, winnerName) {
  let printableScore = '';
  let leadingSpaces = '     ';

  for (let player in scoreBoard) {
    if (player === 'tie' || player === 'all bust') continue;

    printableScore += leadingSpaces + player +
      ': ' + scoreBoard[player];
  }
  let dashes = makeDashes(printableScore.length - leadingSpaces.length);

  print(leadingSpaces + MESSAGES.numberOfGames + '      ' + MESSAGES.numberOfWins);
  print('\n' + leadingSpaces + dashes + '\n' + printableScore + '\n' + leadingSpaces + dashes);
  print(getRoundWinMessage(printableScore, winnerName));
}

function getRoundWinner(handValues) {
  let roundWinner = null;
  let winnerHandValue = 0;

  for (let key in handValues) {
    if (handValues[key] > winnerHandValue) {
      winnerHandValue = handValues[key];
      roundWinner = key;
    } else if (handValues[key] === winnerHandValue) {
      roundWinner = 'tie';
    }
  }
  if (roundWinner === null) {
    roundWinner = 'all bust';
  }
  return roundWinner;
}

function getRoundWinMessage(scoreLine, winnerName = null) {
  if (winnerName === null) {
    return '\n\n';
  } else if (winnerName === 'tie') {
    return TIE_BUST_TEXT_COLOUR + '          TIE (NO SCORE CHANGE)' + DEFAULT_TEXT_COLOUR + '\n\n';
  } else if (winnerName === 'all bust') {
    return TIE_BUST_TEXT_COLOUR + '          ALL BUST' + DEFAULT_TEXT_COLOUR + '\n\n';
  }

  let arrowsLine = replaceNameWithArrowsAndRestWithSpaces(
    scoreLine,
    winnerName
  );
  let WINNERline = replaceArrowsWithWINNER(arrowsLine);
  return WINNER_TEXT_COLOUR + arrowsLine + '\n' + WINNERline + '\n' + DEFAULT_TEXT_COLOUR;
}

function replaceNameWithArrowsAndRestWithSpaces(inputString, playerName) {
  let nameRegex = RegExp(playerName);
  let scoreLineWithNameReplaced = inputString.replace(nameRegex, 'Ó');
  let scoreLineAllSpaces = scoreLineWithNameReplaced.replace(/[^Ó]/gi, ' ');

  let pointToWinnerArray = [];
  pointToWinnerArray.push(scoreLineAllSpaces.replace(/Ó/, '↑↑↑↑↑↑'));
  return pointToWinnerArray.join();
}

function replaceArrowsWithWINNER(inputString) {
  let WINNERline = inputString.replace(/[↑]{1,}/, 'WINNER');
  return WINNERline;
}


//******************\\
//* MAKE TEMPLATES *\\
//******************\\
function makeMasterDeck(suits, values) {
  let deck = [];

  suits.forEach(suit => {
    values.forEach(value => {
      let card = value.padEnd(2, ' ') + suit;
      deck.push(card);
    });
  });

  return deck;
}

function makeScoreboardTemplate(numberOfCpus, numberOfUsers) {
  let scoreBoard = {};

  for (let cpuPlayer = 1; cpuPlayer <= numberOfCpus; cpuPlayer++) {
    scoreBoard[CPUS_NAME + String(cpuPlayer)] =  0;
  }

  if (numberOfUsers) {
    scoreBoard[USER_NAME] = 0;
  }

  scoreBoard.tie = NaN;
  return scoreBoard;
}

function makeHandValuesTemplate(numberOfCpus, numberOfUsers) {
  let handValues = {};

  for (let cpuPlayer = 1; cpuPlayer <= numberOfCpus; cpuPlayer++) {
    handValues[CPUS_NAME + String(cpuPlayer)] =  0;
  }

  if (numberOfUsers) {
    handValues[USER_NAME] = 0;
  }

  return handValues;
}

function makeHandsTemplate(numberOfCpus, numberOfUsers) {
  let hands = {};

  for (let cpuPlayer = 1; cpuPlayer <= numberOfCpus; cpuPlayer++) {
    hands[CPUS_NAME + String(cpuPlayer)] =  [];
  }

  if (numberOfUsers) {
    hands[USER_NAME] = [];
  }


  return hands;
}

function makePlayerHandsAreVisibleTemplate(numberOfCpus, numberOfUsers) {
  let playersHandsVisibleOrNot = {};

  for (let cpuPlayer = 1; cpuPlayer <= numberOfCpus; cpuPlayer++) {
    playersHandsVisibleOrNot[CPUS_NAME + String(cpuPlayer)] =  false;
  }

  if (numberOfUsers) {
    playersHandsVisibleOrNot[USER_NAME] = true;
  }


  return playersHandsVisibleOrNot;
}


//********\\
//* MISC *\\
//********\\
function randomNumBetween(min, max) {
  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor((Math.random() * (max - min + 1)) + min);
}

function pause(secondsToPause) {
  let currentTime = getCurrentTimeInSeconds();
  let endTime = currentTime + secondsToPause;

  while (currentTime < endTime) {
    currentTime = getCurrentTimeInSeconds();
  }
}

function getCurrentTimeInSeconds() {
  return new Date().getTime() / 1000;
}

function makeSpaces(numOfSpaces) {
  return ' '.repeat(numOfSpaces);
}

function print(input) {
  console.log(input);
}

function makeDashes(numOfDashes) {
  return '-'.repeat(numOfDashes);
}

function throwErrorsIfGameParametersAreWrong() {
  if (WINS_NEEDED < 1) {
    throw new Error('Need at least 1 win');
  }

  if (NUMBER_OF_PLAYERS < 2) {
    throw new Error('Need at least 2 players');
  }

  if (
    ![0, 1].includes(NUMBER_OF_USERS) ||
    ![1, 2, 3, 4].includes(NUMBER_OF_CPUS)
  ) {
    throw new Error('Outside player limits');
  }
}


//************************\\
//* PRINT FANCY MESSAGES *\\
//************************\\
function printShufflingMessage(scoreBoard, lengthOfMessage = 0.6) {
  console.clear();

  printScoreBoard(scoreBoard);
  print(MESSAGES.shuffling);
  pause(lengthOfMessage);
}

function printOpeningScreen() {
  console.clear();

  print(FANCY_WELCOME_MESSAGE);
  print('\n' + '       ' + MESSAGES.numberOfGames + '            ' + MESSAGES.numberOfWins);
  print(MESSAGES.pressAnyKey);

  readline.keyIn();
}

// const FANCY_SHUFFLING_MESSAGE =
// "  _____ _    _ _    _ ______ ______ _      _____ _   _  _____ " + '\n' +
// " / ____| |  | | |  | |  ____|  ____| |    |_   _| \\ | |/ ____|" + '\n' +
// "| (___ | |__| | |  | | |__  | |__  | |      | | |  \\| | |  __ " + '\n' +
// " \\___ \\|  __  | |  | |  __| |  __| | |      | | | . ` | | |_ |" + '\n' +
// " ____) | |  | | |__| | |    | |    | |____ _| |_| |\\  | |__| |" + '\n' +
// "|_____/|_|  |_|\\____/|_|    |_|    |______|_____|_| \\_|\\_____|";