//   PROBLEM
//*  UNDERSTAND
//    - read the problem description
//    - examine all examples
//    - ask clarifying questions
//*  INPUTS
//?  number
//*  OUTPUTS
//?  number (maximum rotation)
//*  RULES AND REQUIREMENTS
//?  
//*  MENTAL MODEL
//? Move first digit to the end, move (crrent) second digit
//? to the end (used to be the third), move the third to the end etc.

//*  ALGORITHM
//      - step by step process that takes you from input to output
//   - handles edges cases and valid example inputs
//   - your code will depend on your algorithm
//? string, split
//? iterate through all character moves them to the end.
//? convert to object

//* CODE
//   - time to write the code!
//   - use everything you've gathered in your PEDAC to write the code
//   Debug (if needed)
//   - if there are errors in output, don't panic!
//   - carefully review algorithm before looking at your code
//   - once you've identified the issue, change the algorithm first,
//     then fix the code
//   - try again!

maxRotation(735291);          // 321579
maxRotation(3);               // 3
maxRotation(35);              // 53
maxRotation(105);             // 15 -- the leading zero gets dropped
maxRotation(8703529146);      // 7321609845

function maxRotation(inputNumber) {
  let digitArray = String(inputNumber).split('');

  for (let ind = 0; ind < digitArray.length; ind++) {
    digitArray = moveElementToEnd(digitArray, ind);
  }

  console.log(Number(digitArray.join('')))
}

function moveElementToEnd(inputArray, index) {
  let newArray = inputArray.slice();
  let removedDigit = newArray.splice(index, 1)[0];
  newArray.push(removedDigit);
  return newArray;
}