""
//   PROBLEM
//*  UNDERSTAND
//    - read the problem description
//    - examine all examples
//    - ask clarifying questions
//*  INPUTS
//?  6 numbers
//*  OUTPUTS
//?  A string, basically boolean
//*  RULES AND REQUIREMENTS
//?  always 2 digit numbers?
//?  partial match if not?
//*  MENTAL MODEL
//?  get 6 input numbers
//?  check the first 5 for a match of the 6th
//*  QUESTIONS
//?  always 2 digit numbers?
//?  partial match if not?

//*  EXAMPLES/TEST CASES
//    - understand how the input translates to output
//    - identify edge cases
//    - create the test cases and confirm outputs
//*  VALID CASES  */
//*  EDGE CASES

//*  DATA STRUCTURES
//    - what sort of actions do you have to do (sort, collect, filter, etc.)
//    - what kind of data are you primarily dealing with? (strings, arrays,
//      numbers, objects, etc.)
//    - this helps you to focus on methods for these types
//*  INPUTS
//?  numbers as strings
//*  OUTPUTS
//?  strings
//*  PROCESSING
//?  can probably leave as strings

//*  ALGORITHM
//      - step by step process that takes you from input to output
//   - handles edges cases and valid example inputs
//   - your code will depend on your algorithm
//?  Get 6 numbers
//?
//?

//* CODE
//   - time to write the code!
//   - use everything you've gathered in your PEDAC to write the code
//   Debug (if needed)
//   - if there are errors in output, don't panic!
//   - carefully review algorithm before looking at your code
//   - once you've identified the issue, change the algorithm first,
//     then fix the code
//   - try again!

const readline = require("readline-sync");

console.log("Input 5 numbers, then a 6th that will tested for it's existence among the first 5");

let fiveNumbers = getFiveNumbers();
let testNumber = readline.question("Enter a value to see if it exists among the five: ");
let testCasePresent = fiveNumbers.includes(testNumber);

let appearsOrNot = testCasePresent ? "appears" : "does not appear" ;

console.log(`The number ${testNumber} ${appearsOrNot} in ${ fiveNumbers.join(', ') }.`);

function getFiveNumbers() {
  let inputNumbers = [];
  inputNumbers.push(readline.question("Enter the 1st: "));
  inputNumbers.push(readline.question("Enter the 2nd: "));
  inputNumbers.push(readline.question("Enter the 3rd: "));
  inputNumbers.push(readline.question("Enter the 4th: "));
  inputNumbers.push(readline.question("Enter the 5th: "));
  return inputNumbers;
}