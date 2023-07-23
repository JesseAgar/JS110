union([1, 3, 5, 9, 9], [3, 6, 9, 9, 9, 9]);    // [1, 3, 5, 6, 9]

function union(array1, array2) {
  let filteredArray = [];
  let joinedArray = array1.concat(array2);

  joinedArray.forEach(element => {
    if (!filteredArray.includes(element)) {
      filteredArray.push(element);
    }
  });

  console.log(filteredArray);
}