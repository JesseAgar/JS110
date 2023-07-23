isUppercase('t');               // false
isUppercase('T');               // true
isUppercase('Four Score');      // false
isUppercase('FOUR SCORE');      // true
isUppercase('4SCORE!');         // true
isUppercase('');                // true

function isUppercase(inputString) {
  console.log(inputString.toUpperCase() == inputString);
}