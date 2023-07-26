featured(12);           // 21
featured(20);           // 21
featured(21);           // 35
featured(997);          // 1029
featured(1029);         // 1043
featured(999999);       // 1023547
featured(999999987);    // 1023456987
featured(9876543186);   // 9876543201
featured(9876543200);   // 9876543201
featured(9876543201);   // "There is no possible number that fulfills those requirements."

function featured(number) {
  console.log(String(calculateNextFeaturedNumberGreaterThan(number)));
}

function calculateNextFeaturedNumberGreaterThan(number) {
  let startingNumber = number - (number % 7);
  let featuredNumber = 0;

  for (let multiple = 0; featuredNumber <= number; multiple += 1) {
    let possibleFeaturedNumber = startingNumber + (7 * multiple);

    if (possibleFeaturedNumber > 9876543201) {
      return "There is no possible number that fulfills those requirements.";
    }

    if (eachDigitIsUnique(possibleFeaturedNumber) &&
        isOdd(possibleFeaturedNumber)) {
      featuredNumber = possibleFeaturedNumber;
    } else {
      continue;
    }
  }

  return featuredNumber;
}

function eachDigitIsUnique(number) {
  let digitCount = {};
  let digitArray = String(number).split('');

  digitArray.forEach(digit => {
    digitCount[digit] = digitCount[digit] || 0;
    digitCount[digit]++;
  });

  return Object.values(digitCount).every(count => count <= 1);
}

function isOdd(number) {
  return number % 2 === 1
}