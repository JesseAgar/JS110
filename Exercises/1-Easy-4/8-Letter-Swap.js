swap('Oh what a wonderful day it is');  // "hO thaw a londerfuw yad ti si"
swap('Abcde');                          // "ebcdA"
swap('a');                              // "a"

function swap(string) {
  let swappedString = string.split(' ').map(word => swapStartEndElements(word));

  console.log(swappedString.join(' '));
}

function swapStartEndElements(inputString) {
  let swappedArray = inputString.slice().split('');

  [swappedArray[0], swappedArray[swappedArray.length - 1]] =
  [swappedArray[swappedArray.length - 1], swappedArray[0]];

  return swappedArray.join('');
}