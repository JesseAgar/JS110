console.log(isBlockWord('BATCH'));      // true
console.log(isBlockWord('BUTCH'));      // false
console.log(isBlockWord('jest'));       // true

function isBlockWord(inputString) {
  let blocks = [['b', 'o'], ['x', 'k'], ['d', 'q'], ['c', 'p'], ['n', 'a'], ['g', 't'], ['r', 'e'], ['f', 's'],
    ['j', 'w'], ['h', 'u'], ['v', 'i'], ['l', 'y'], ['z', 'n']];

  inputString = inputString.toLowerCase();
  let constructedString = []
  for (let charIndex = 0; charIndex < inputString.length; charIndex++) {
    for (let blockIndex = 0; blockIndex < blocks.length; blockIndex++) {
      let block = blocks[blockIndex];
      if (block.includes(inputString[charIndex])) {
        constructedString += inputString[charIndex];
        blocks.splice(blockIndex, 1);
        break;
      }
    }

  }

  return constructedString === inputString;
}
