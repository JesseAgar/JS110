interleave([1, 2, 'junk'], ['a', 'b', 'c']);

function interleave(array1, array2) {
  let joinedArray = [];

  array1.forEach((element, index) => {
    joinedArray.push(element);
    joinedArray.push(array2[index]);
  });

  console.log(joinedArray);
}