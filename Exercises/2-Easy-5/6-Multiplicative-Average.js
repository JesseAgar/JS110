multiplicativeAverage([3, 5]);                   // "7.500"
multiplicativeAverage([2, 5, 7, 11, 13, 17]);    // "28361.667"

function multiplicativeAverage(array) {
  console.log((array.reduce((acc, ele) => {
    return acc *= ele;
  }, 1) / array.length).toFixed(2));
}