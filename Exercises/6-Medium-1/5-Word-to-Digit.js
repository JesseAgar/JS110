wordToDigit('Please call me at five five five one two three four. Thanks.');
// "Please call me at 5 5 5 1 2 3 4. Thanks."

function wordToDigit(inputString) {
  inputString = inputString.replace(/one/g, '1');
  inputString = inputString.replace(/two/g, '2');
  inputString = inputString.replace(/three/g, '3');
  inputString = inputString.replace(/four/g, '4');
  inputString = inputString.replace(/five/g, '5');
  inputString = inputString.replace(/six/g, '6');
  inputString = inputString.replace(/seven/g, '7');
  inputString = inputString.replace(/eight/g, '8');
  inputString = inputString.replace(/nine/g, '9');
  inputString = inputString.replace(/zero/g, '0');
  console.log(inputString);
}
