digitList(12345);       // [1, 2, 3, 4, 5]
digitList(7);           // [7]
digitList(375290);      // [3, 7, 5, 2, 9, 0]
digitList(444);         // [4, 4, 4]

function digitList(number) {
  let numberArray = [];
  do {
    let remainder = number % 10;
    numberArray.push(remainder);
    number -= remainder;
    number /= 10;
  } while (number > 0);

  console.log(numberArray.reverse());
}