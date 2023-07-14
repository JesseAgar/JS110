function isPalidromicNumbers(inputNumber) {
  let numbersAsString = String(inputNumber);
  return numbersAsString === numbersAsString.split('').reverse().join('');
}


console.log(isPalidromicNumbers(34543));        // true
console.log(isPalidromicNumbers(123210));       // false
console.log(isPalidromicNumbers(22));           // true
console.log(isPalidromicNumbers(5));            // true
