sequence(5);    // [1, 2, 3, 4, 5]
sequence(3);    // [1, 2, 3]
sequence(1);    // [1]

function sequence(integer) {
  let array = '1'.repeat(integer).split('');
  let returnArray = array.map((element, index) => {
    return index + 1;
  });
  console.log(returnArray);
}