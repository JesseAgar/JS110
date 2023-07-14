runningTotal([2, 5, 13]);             // [2, 7, 20]
runningTotal([14, 11, 7, 15, 20]);    // [14, 25, 32, 47, 67]
runningTotal([3]);                    // [3]
runningTotal([]);                     // []

function runningTotal(arrayOfNumbers) {
  let runningTotalArray = [];

  arrayOfNumbers.reduce((acc, number) => {
    acc += number;
    runningTotalArray.push(acc);
    return acc;
  }, 0);

  console.log(runningTotalArray);
}