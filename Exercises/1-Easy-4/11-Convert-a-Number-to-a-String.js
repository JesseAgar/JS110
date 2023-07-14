integerToString(4321);        // "4321"
integerToString(0);           // "0"
integerToString(5000);        // "5000"
integerToString(-1234567890);  // "1234567890"

function integerToString(inputInteger) {
  let absInputInteger = Math.abs(inputInteger);
  let sum = 0;
  let stringArray = [];
  if (numbersAreEqual(absInputInteger, sum)) {
    console.log(numToChar(sum));
    return;
  }

  for (let currentPosition = 1;
    !numbersAreEqual(absInputInteger, sum);
    currentPosition++) {
    let currentDigit = extractDigit(currentPosition, absInputInteger);

    stringArray.push(numToChar(currentDigit));

    sum += currentDigit * Math.pow(10, (currentPosition - 1));

  }
  let sign = Math.sign(inputInteger) === -1 ? '-' : '';
  console.log( sign + stringArray.reverse().join(''));
}

function extractDigit(digitPosition, number) {
  let exponent = digitPosition - 1;
  let digit = Math.floor(number / (10 ** exponent) % 10);
  return digit;
}

function numbersAreEqual(givenNumber, testNumber) {
  return givenNumber - testNumber === 0;
}

function numToChar(number) {
  const numStrConverter = {
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
  };

  for (let key in numStrConverter) {
    if (number === numStrConverter[key]) {
      return key;
    }
  }
}

