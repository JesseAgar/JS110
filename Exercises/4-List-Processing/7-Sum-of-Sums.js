sumOfSums([3, 5, 2]);        // (3) + (3 + 5) + (3 + 5 + 2) --> 21
sumOfSums([1, 5, 7, 3]);     // (1) + (1 + 5) + (1 + 5 + 7) + (1 + 5 + 7 + 3) --> 36
sumOfSums([4]);              // 4
sumOfSums([1, 2, 3, 4, 5]);  // 35

function sumOfSums(arrayOfNumbers) {
  let sum = 0;
  arrayOfNumbers.reduce((acc, num) => {
    let runningSum = acc + num;
    sum += runningSum;
    return runningSum;
  }, 0);

  console.log(sum);
}