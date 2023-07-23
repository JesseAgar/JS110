let vehicles = ['car', 'car', 'truck', 'car', 'SUV', 'suv', 'truck',
  'motorcycle', 'motorcycle', 'car', 'truck'];

countOccurrences(vehicles);

function countOccurrences(array) {
  let stringCounter = {};

  array = array.map(string => string.toLowerCase());

  array.forEach(string => {
    stringCounter[string] = stringCounter[string] || 0;
    stringCounter[string] += 1;
  });

  Object.entries(stringCounter).forEach(stringCount => {
    console.log(stringCount[0] + ' => ' + stringCount[1]);
  });
}

// console output -- your output sequence may be different
// car => 4
// truck => 3
// SUV => 1
// motorcycle => 2