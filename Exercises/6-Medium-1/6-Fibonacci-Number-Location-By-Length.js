findFibonacciIndexByLength(2n) === 7n;    // 1 1 2 3 5 8 13
findFibonacciIndexByLength(3n) === 12n;   // 1 1 2 3 5 8 13 21 34 55 89 144
findFibonacciIndexByLength(10n) === 45n;
findFibonacciIndexByLength(16n) === 74n;
findFibonacciIndexByLength(100n) === 476n;
findFibonacciIndexByLength(1000n) === 4782n;
findFibonacciIndexByLength(10000n) === 47847n;

// The last example may take a minute or so to run.

function findFibonacciIndexByLength(targetLength) {
  targetLength = BigInt(targetLength);
  let fibonacciSequence = [1n, 1n];
  while (true) {
    pushNextFibonacciDigit(fibonacciSequence);

    if (lengthOfLastDigit(fibonacciSequence) >= targetLength) {
      console.log(fibonacciSequence.length);
      break;
    }
  }
}

function pushNextFibonacciDigit(sequenceArray) {
  let lastIndex = BigInt(sequenceArray.length) - 1n;
  let secondLastIndex = BigInt(sequenceArray.length) - 2n;
  sequenceArray.push(BigInt(sequenceArray[lastIndex]) + BigInt(sequenceArray[secondLastIndex]));
}

function lengthOfLastDigit(sequenceArray) {
  let lastIndex = BigInt(sequenceArray.length) - 1n;
  return String(sequenceArray[lastIndex]).length;
}
