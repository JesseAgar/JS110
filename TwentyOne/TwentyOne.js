const readline = require('readline-sync');

const HAND_VALUE_TARGET = 21; // best < 151
const WINS_NEEDED = 3;

const COMPUTER_PLAYER_NAME = 'CPU';
const USER_PLAYER_NAME = 'The Human';
const NUMBER_OF_USERS = 1; // 1 or 0
const NUMBER_OF_CPUS = 3; // Between 1 and 4
const NUMBER_OF_PLAYERS = NUMBER_OF_USERS + NUMBER_OF_CPUS;

if (NUMBER_OF_PLAYERS < 2) {
  throw new Error('Need at least 2 players');
}
if (![0, 1].includes(NUMBER_OF_USERS) ||
![1, 2, 3, 4].includes(NUMBER_OF_CPUS)) {
  throw new Error('Outside player limit');
}

const SUITS = ['♠', '◆', '♣', '♥'];
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const MASTER_DECK = buildDeck(SUITS, VALUES);
const AI_TARGET_SCORE = HAND_VALUE_TARGET - 4;
const INITIAL_DRAW_NUMBER = Math.floor(HAND_VALUE_TARGET / 10);
const PAUSE_BETWEEN_INITIAL_DRAWS = 0.5 * ( 1 / INITIAL_DRAW_NUMBER);

const MESSAGES = {
  playAgain: 'Do you want to play again?',
  yesOrNo: '(y)es or (n)o',
  numberOfGames: '       Hand Value Target: ' + HAND_VALUE_TARGET +
  '            First to ' + WINS_NEEDED + ' wins!',
  goodbye: 'Goodbye',
  shuffling: '\n\n\n\n        SHUFFLING',
  pressAnyKey: '\n\n   (press most any key to continue)',
  hitOrStay: '(h)it or (s)tay?',
};

const SCOREBOARD_TEMPLATE = makeScoreboard(NUMBER_OF_CPUS, NUMBER_OF_USERS);
const HAND_VALUES_TEMPLATE = makeHandValues(NUMBER_OF_CPUS, NUMBER_OF_USERS);
const HANDS_TEMPLATE = makeHands(NUMBER_OF_CPUS, NUMBER_OF_USERS);
const PLAYER_HAND_IS_VISIBLE_TEMPLATE =
  makePlayersHandIsVisible(NUMBER_OF_CPUS, NUMBER_OF_USERS);

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


//! SETUP
printOpeningScreen();

while (true) {
  printShufflingMessage();

  let scoreBoard = Object.assign({}, SCOREBOARD_TEMPLATE);
  let deck = MASTER_DECK.slice();
  deck = shuffled(deck);
  let hands = JSON.parse(JSON.stringify(HANDS_TEMPLATE));
  let playerHandIsVisible = Object.assign([], PLAYER_HAND_IS_VISIBLE_TEMPLATE);
  let handValues = Object.assign([], HAND_VALUES_TEMPLATE);

  //! INITIAL CARD DRAW
  for (let drawRound = 0; drawRound < INITIAL_DRAW_NUMBER; drawRound++) {
    for (let player in hands) {
      let topCardOfDeck = drawCard(deck);

      hands[player].push(topCardOfDeck);
      handValues[player] = getHandValue(hands[player]);

      pause(PAUSE_BETWEEN_INITIAL_DRAWS);
      console.clear();
      printTableTop(hands, playerHandIsVisible, handValues);
    }
  }

  //! USER TURN
  while (true) {
    if (NUMBER_OF_USERS === 0) break;

    while (userWantsToHit()) {
      printTableTop(hands, playerHandIsVisible, handValues);
      let topCardOfDeck = drawCard(deck);
      hands[USER_PLAYER_NAME].push(topCardOfDeck);
      pause(0.5);
      printTableTop(hands, playerHandIsVisible);
      pause(0.7);
    }
    break;
  }

  //! CPU TURNS


  //! ROUND END

  if (wantToPlayAgain()) {
    continue;
  } else {
    break;
  }
}

console.clear();
print(MESSAGES.goodbye);


//////
// ? USER TURN
//////
// IF user exists
// WHILE true
// ASK for hit or stay
// IF stay end turn. Break;
// IF hit, deck.pop(), push to playerHand
// * PRINT tabletop
// IF bust break;


//////
// ? CPU TURNS
//////
// forEach CPU
// SET playersHandIsVisible.cpu = true
// * PRINT tabletop
// WHILE true
// if <= AI target, hit
// * PRINT tabletop
// else stay
// if bust end turn

//////
// ? WINNER
//////
// if tie, continue
// player with highest number scoreboard ++;
// if (winner) PRINT winner 
//   Ask to play again, if yes continue else break;

//GAME
//GAME
//GAME


// do {
//   console.clear();
//   print(MESSAGES.shuffling)
//   pauseInSeconds(0.9);
//   console.clear();

//   let scoreBoard = Object.assign({}, SCOREBOARD_TEMPLATE);
//   playRound(scoreBoard)
// } while (wantToPlayAgain());

function playTournament() {
  let scoreBoard = Object.assign({}, SCOREBOARD_TEMPLATE);

  while (!someoneWonTournament(scoreBoard)) {
    scoreBoard[playRound()]++;
  }
  print(getTournamentWinner(scoreBoard) + ' wins!');
}

function playRound(scoreBoard) {
  let deck = shuffled(MASTER_DECK.slice());
  let hands = drawStartingHands(deck);
  let handValues = Object.assign({}, HAND_VALUES_TEMPLATE);
}

function drawStartingHands(deck) {
  let hands = JSON.parse(JSON.stringify(HANDS_TEMPLATE));
  for (let drawnCard = 0; drawnCard < INITIAL_DRAW_NUMBER; drawnCard++) {
    let playerCards = Object.values(hands);

    playerCards.forEach(hand => {
      let topCardOfDeck = drawCard(deck);
      pause(0.5 * ( 1 / INITIAL_DRAW_NUMBER));
      hand.push(topCardOfDeck);
      console.clear();
      printTableTop(hands);
    });
  }
  return hands;
}

function someoneWonTournament(scoreBoard) {
  return Object.values(scoreBoard).some(score => score >= WINS_NEEDED);
}

function getTournamentWinner(scoreBoard) {
  Object.entries.forEach(player => {
    let playerScore = player[1];
    let playerName = player[0];
    if (playerScore >= WINS_NEEDED) {
      return playerName;
    } else {
      return undefined;
    }
  });
}

function drawCard(deck) {
  if (deck.length === 1) {
    let newDeck = shuffled(MASTER_DECK.slice());
    deck.push(...newDeck);
  }
  return deck.pop();
}

function wantToPlayAgain() {
  print(MESSAGES.playAgain);
  return getYesOrNo();
}

function getYesOrNo() {
  print(MESSAGES.yesOrNo);
  let yesOrNo = readline.keyIn('', {limit: 'yn'}).toLowerCase();

  if (yesOrNo === 'n') {
    console.clear();
    print(MESSAGES.goodbye);
    return false;
  } else if (yesOrNo === 'y') {
    return true;
  }
}
// PRINT TABLETOP
// PRINT TABLETOP
// PRINT TABLETOP
function printTableTop(hands, handIsVisible) {
  console.clear();
  for (let CPUPlayerNum = 1; CPUPlayerNum <= NUMBER_OF_CPUS; CPUPlayerNum++) {
    let cpuName = COMPUTER_PLAYER_NAME + CPUPlayerNum;
    let nameToPrint = (COMPUTER_PLAYER_NAME + ' ' + CPUPlayerNum);
    if (handIsVisible[cpuName]) {
      printCardsFaceUp(nameToPrint, hands[cpuName]);
    } else {
      printCardsFaceDown(nameToPrint, hands[cpuName]);
    }

  }
  if (NUMBER_OF_USERS) {
    print('\n');
    printCardsFaceUp(USER_PLAYER_NAME, hands[USER_PLAYER_NAME]);
  }
}

function printCardsFaceUp(playerName, playerCards) {
  let allCardsVisible = Infinity;
  return printCardsFaceDown(playerName, playerCards, allCardsVisible);
}

function printCardsFaceDown(playerName, playerCards = [], numCardsVisible = 1) {
  let cardSections = Object.keys(CARD_FRONT);
  let hand = [];


  cardSections.forEach((section,index) => {
    hand = addNameToSection(hand, section, playerCards,
      playerName, numCardsVisible);
    hand = addCardsToSection(hand, section, playerCards, numCardsVisible);

    let notBottomCardSection = index < cardSections.length - 1;

    if (notBottomCardSection) {
      hand.push('\n');
    }
  });

  print(hand.join(''));
}

function addCardsToSection(inputHand, section, playerCards, numCardsVisible, ) {
  let outputHand = inputHand.slice();

  playerCards.forEach((card, index) => {
    if (index < numCardsVisible) {
      outputHand.push(CARD_FRONT[section](card));
    } else {
      outputHand.push(CARD_BACK[section]());
    }
  });

  return outputHand;
}

function addNameToSection(inputHand, section, playerCards, playerName, numCardsVisible) {
  let outputPrintableHand = inputHand.slice();
  let spacesAfterName = 1;
  let nameLength = playerName.length;
  let printableName = playerName.padEnd(nameLength + spacesAfterName, ' ');
  let namePadding = makeSpaces(printableName.length);
  let valuesAreVisible = (numCardsVisible === Infinity);
  let handValue = getHandValue(playerCards);

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

function printScore(scoreBoard) {
  let lengthOfAllNames = Object.keys(SCOREBOARD_TEMPLATE);
  print();
}

function userWantsToHit() {
  print(MESSAGES.hitOrStay);
  return readline.keyIn('', {limit: 'hs'}).toLowerCase() === 'h';
}
// CALCULATE HAND VALUE
// CALCULATE HAND VALUE
// CALCULATE HAND VALUE
function getHandValue(playerCards) {
  let handValue = 0;
  let aceCount = 0;

  playerCards.forEach(card => {
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
  return playerHandScore > HAND_VALUE_TARGET
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
    if (totalValue < HAND_VALUE_TARGET) break;
    acesOne++;
    acesEleven--;
  }
  return (acesOne * 1) + (acesEleven * 11);
}

function isAce(card) {
  let cardValue = card.replace(/[\W]/gi, '');
  return cardValue === 'A';
}


// BUILD / SHUFFLE DECK
// BUILD / SHUFFLE DECK
// BUILD / SHUFFLE DECK
function buildDeck(suits, values) {
  let deck = [];
  suits.forEach(suit => {
    values.forEach(value => {
      let card = value.padEnd(2, ' ') + suit;
      deck.push(card);
    });
  });
  return deck;
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


// MAKE TEMPLATES
// MAKE TEMPLATES
// MAKE TEMPLATES
function makeScoreboard(numberOfCpus, numberOfUsers) {
  let scoreBoard = {};

  for (let cpuPlayer = 1; cpuPlayer <= numberOfCpus; cpuPlayer++) {
    scoreBoard[COMPUTER_PLAYER_NAME + String(cpuPlayer)] =  0;
  }

  if (numberOfUsers) {
    scoreBoard[USER_PLAYER_NAME] = 0;
  }

  scoreBoard.tie = NaN;
  return scoreBoard;
}

function makeHandValues(numberOfCpus, numberOfUsers) {
  let handValues = {};

  for (let cpuPlayer = 1; cpuPlayer <= numberOfCpus; cpuPlayer++) {
    handValues[COMPUTER_PLAYER_NAME + String(cpuPlayer)] =  0;
  }

  if (numberOfUsers) {
    handValues[USER_PLAYER_NAME] = 0;
  }

  return handValues;
}

function makeHands(numberOfCpus, numberOfUsers) {
  let hands = {};

  for (let cpuPlayer = 1; cpuPlayer <= numberOfCpus; cpuPlayer++) {
    hands[COMPUTER_PLAYER_NAME + String(cpuPlayer)] =  [];
  }

  if (numberOfUsers) {
    hands[USER_PLAYER_NAME] = [];
  }


  return hands;
}

function makePlayersHandIsVisible(numberOfCpus, numberOfUsers) {
  let playersHandsVisibleOrNot = {};

  for (let cpuPlayer = 1; cpuPlayer <= numberOfCpus; cpuPlayer++) {
    playersHandsVisibleOrNot[COMPUTER_PLAYER_NAME + String(cpuPlayer)] =  false;
  }

  if (numberOfUsers) {
    playersHandsVisibleOrNot[USER_PLAYER_NAME] = true;
  }


  return playersHandsVisibleOrNot;
}

/////////
// MISC
/////////
function randomNumBetween(min, max) {
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor((Math.random() * (max - min + 1)) + min);
}

function pause(secondsToPause) {
  let currentTime = currentTimeInSeconds();
  let endTime = currentTime + secondsToPause;
  while (currentTime < endTime) {
    currentTime = currentTimeInSeconds();
  }
}

function currentTimeInSeconds() {
  return new Date().getTime() / 1000;
}

function makeSpaces(numOfSpaces) {
  return ' '.repeat(numOfSpaces);
}

function print(input) {
  console.log(input);
}

function printOpeningScreen() {
  console.clear();
  print(`╦ ╦┌─┐┬  ┌─┐┌─┐┌┬┐┌─┐  ╔╦╗┌─┐
║║║├┤ │  │  │ ││││├┤    ║ │ │
╚╩╝└─┘┴─┘└─┘└─┘┴ ┴└─┘   ╩ └─┘` + '\n' +
    `  ██████  ██       █████   ██████ ██   ██      ██  █████   ██████ ██   ██ 
  ██   ██ ██      ██   ██ ██      ██  ██       ██ ██   ██ ██      ██  ██  
  ██████  ██      ███████ ██      █████        ██ ███████ ██      █████   
  ██   ██ ██      ██   ██ ██      ██  ██  ██   ██ ██   ██ ██      ██  ██  
  ██████  ███████ ██   ██  ██████ ██   ██  █████  ██   ██  ██████ ██   ██ `);

  print('\n' + MESSAGES.numberOfGames);
  console.log(MESSAGES.pressAnyKey);
  readline.keyIn();
}

function makeDashes(numOfDashes) {
  return '-'.repeat(numOfDashes);
}

function printShufflingMessage(lengthOfMessage = 0.9) {
  console.clear();
  print(MESSAGES.shuffling);
  pause(lengthOfMessage);
  console.clear();
}

// ! while (true)
//////
// ? SETUP
//////
// * PRINT shuffling
// SET scoreBoard
// SET deck = MasterDeck.slice()
// SET hands = blankHands
// SET playersHandIsVisible
// SET handValues = blankHandValues
// hands = initial Draw
// * PRINT tabletop with each card add
// * only user fully visible
