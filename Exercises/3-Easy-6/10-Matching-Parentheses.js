const validBrackets = '[{()}]'
console.log(isBalanced("What (is) this?") === true);
console.log(isBalanced("What is) this?") === false);
console.log(isBalanced("What (is this?") === false);
console.log(isBalanced("((What) (is this))?") === true);
console.log(isBalanced("((What)) (is this))?") === false);
console.log(isBalanced("Hey!") === true);
console.log(isBalanced(")Hey!(") === false);
console.log(isBalanced("What ((is))) up(") === false);

function isBalanced(inputString) {
  let bracketArray = inputString.split('').filter(ele => validBrackets.includes(ele));
  let bracketCounter = 0;

  for (let index = 0; index < bracketArray.length; index++) {
    if (bracketCounter < 0) {
      return false;
    }
    if (bracketArray[index] === '(') {
      bracketCounter += 1;
    } else {
      bracketCounter -= 1;
    }
  }

  if (bracketCounter === 0) {
    return true;
  } else {
    return false;
  }
}
