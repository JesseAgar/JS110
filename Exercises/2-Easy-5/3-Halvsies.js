halvsies([1, 2, 3, 4]);       // [[1, 2], [3, 4]]
halvsies([1, 5, 2, 4, 3]);    // [[1, 5, 2], [4, 3]]
halvsies([5]);                // [[5], []]
halvsies([]);                 // [[], []]

function halvsies(array) {
  let newArray = []
  newArray.push(array.slice(0, Math.ceil(array.length / 2)));
  newArray.push(array.slice(Math.ceil(array.length / 2)));
  console.log(newArray);
}