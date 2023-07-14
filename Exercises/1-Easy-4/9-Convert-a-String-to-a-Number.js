console.log(stringToInteger("4321")); // logs true
console.log(stringToInteger("570")); // logs true


function stringToInteger(numberString) {
  let absoluteString = removeNegativeSign(numberString);

  let numArray = absoluteString.split('').map(char => charToNum(char)).reverse();

  let num = 0;

  for (let index = 0; index < numArray.length; index++) {
    num += numArray[index] * (10 ** index);
  }

  if (isNegative(numberString)) {
    return num * -1;
  } else {
    return num;
  }
}

function charToNum(string) {
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
  const numbers = '0123456789';

  if (string.length >= 2 || !numbers.includes(string) || string === '') {
    return NaN;
  }
  return numStrConverter[string];
}

function removeNegativeSign(string) {
  if (isNegative(string)) {
    return string.slice(1);
  } else {
    return string;
  }
}

function isNegative(string) {
  return string.startsWith('-');
}