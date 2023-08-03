/*
Pseudocode
1. Initialize deck
2. Deal cards to player and dealer
3. Player turn: hit or stay
  - repeat until bust or stay
4. If player busts, dealer wins
5. Dealer turn: hit or stay
  - repeat until total >= 17
6. IF dealer busts, player wins
7. compare card and declare winner
*/
const SUITS_ARRAY = ['heart', 'diamond', 'club', 'spade'];
const VALUES_ARRAY = [ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
const rlsync = require('readline-sync');
const JACKPOT_SCORE = 21;
const DEALER_DRAWING_LIMIT = 17;
const SCORE_BOARD = {playerScore : 0, dealerScore : 0};
const UNIQUE_VALUES = {
  ace  : 'ace',
  jack : 10,
  queen: 10,
  king : 10,
  2    : 2,
  3    : 3,
  4    : 4,
  5    : 5,
  6    : 6,
  7    : 7,
  8    : 8,
  9    : 9,
  10   : 10
};

function prompt(msg) {
  console.log(`${msg}`);
}

function initializeDeck() {
  let deck = [];

  for (let suit = 0; suit < SUITS_ARRAY.length; suit += 1) {
    for (let value = 0; value < VALUES_ARRAY.length; value += 1) {
      deck.push([SUITS_ARRAY[suit], VALUES_ARRAY[value]]);
    }
  }
  return deck;
}

function dealingCard(presentDeck) {

  let randomIndex = Math.floor(Math.random() * presentDeck.length);
  let randomCard = presentDeck[randomIndex];

  presentDeck.splice(randomIndex, 1);

  return randomCard;
}

function cardValue(card, score) {
  let playerCardValue = UNIQUE_VALUES[card[1]];

  if (playerCardValue === 'ace') {
    if (score > 10) {
      playerCardValue = 1;
    } else if (score <= 10) {
      playerCardValue = 11;
    }
  }
  return playerCardValue;
}

function dealerTurn(currentDeck) {
  let dealerCard = dealingCard(currentDeck);
  let secondDealerCard = dealingCard(currentDeck);

  SCORE_BOARD['dealerScore'] = cardValue(dealerCard, SCORE_BOARD['dealerScore']);
  SCORE_BOARD['dealerScore'] += cardValue(secondDealerCard, SCORE_BOARD['dealerScore']);


  prompt(`Dealer has [${dealerCard}] and an unknown card ${secondDealerCard}!`);
}

function dealerDraw(currentDeck) {

  while (SCORE_BOARD['dealerScore'] < DEALER_DRAWING_LIMIT) {

    let computerNextCard = dealingCard(currentDeck);
    SCORE_BOARD['dealerScore'] += cardValue(computerNextCard, SCORE_BOARD['dealerScore']);
  }
}

function playerTurn(currentDeck) {
  let cardOne = dealingCard(currentDeck); //first card
  let cardTwo = dealingCard(currentDeck); // second card

  prompt(`Player's first card is [${cardOne}]`);
  prompt(`Player's second card is [${cardTwo})]`);
  console.log(); //space
  SCORE_BOARD['playerScore'] = cardValue(cardOne, SCORE_BOARD['playerScore']); //ace, 0 => 11
  SCORE_BOARD['playerScore'] += cardValue(cardTwo, SCORE_BOARD['playerScore']); //ace, 11 => 1

  prompt(`Player's current score is ${SCORE_BOARD['playerScore']}`);

  return SCORE_BOARD['playerScore'];
}

while (true) {
  SCORE_BOARD['playerScore'] = 0;
  SCORE_BOARD['dealerScore'] = 0;

  console.clear();

  let currentDeck = initializeDeck().slice();

  dealerTurn(currentDeck);
  playerTurn(currentDeck);


  while (true) {
    prompt("Do you want to hit or stay? h/s? ");
    let answer = rlsync.question()[0].toLowerCase();

    if (answer === 'h') {
      let playerNextCard = dealingCard(currentDeck);
      prompt(`The card you drew is [${playerNextCard}]`); //next card
      console.log(); //space

      SCORE_BOARD['playerScore'] += cardValue(playerNextCard, SCORE_BOARD['playerScore']);
      prompt(`Player's current score is ${SCORE_BOARD['playerScore']}`);
    }

    console.log(); //space

    if (SCORE_BOARD['playerScore'] > JACKPOT_SCORE) {
      prompt("Player busted. Dealer Wins!");
      break;
    }

    if (answer === 's') {
      dealerDraw(currentDeck);
      prompt(`Dealer's current score is ${SCORE_BOARD['dealerScore']}`);

      if (SCORE_BOARD['dealerScore'] > JACKPOT_SCORE) {
        prompt("Dealer busted! Player wins.");
        break;
        
      } else if (SCORE_BOARD['playerScore'] === SCORE_BOARD['dealerScore']) {
        prompt("It's a tie!");
        break;
      } else if (SCORE_BOARD['playerScore'] < JACKPOT_SCORE && SCORE_BOARD['dealerScore'] < JACKPOT_SCORE) {
        if (SCORE_BOARD['playerScore'] > SCORE_BOARD['dealerScore']) {
          prompt("Player wins!");
        } else {
          prompt("Dealer wins!");
        }
      }
      break;
    }
  }
  prompt("Do you want another game? y/n");
  let response = rlsync.question().toLowerCase();

  while (response[0] !== 'y' && response[0] !== 'n') {
    prompt("Please enter y or n!");
    response = rlsync.question();
  }

  if (response[0] === 'n') {
    prompt("See you again!");
    break;
  }
}