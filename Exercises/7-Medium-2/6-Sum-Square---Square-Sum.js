console.log(sumSquareDifference(3));      // 22 --> (1 + 2 + 3)**2 - (1**2 + 2**2 + 3**2)
console.log(sumSquareDifference(10));     // 2640
console.log(sumSquareDifference(1));      // 0
console.log(sumSquareDifference(100));    // 25164150


function sumSquareDifference(number) {
  return sumOfSequenceSquared(number) - sequenceSquaresSummed(number);
}


function sumOfSequenceSquared(number) {
  if (number <= 1) {
    return number;
  } else {
    return (number ** 3) + sumOfSequenceSquared(number - 1);
  }
}

function sequenceSquaresSummed(number) {
  if (number <= 1) {
    return number;
  } else {
    return (number ** 2) + sequenceSquaresSummed(number - 1);
  }
}