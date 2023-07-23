
rotateRightmostDigits(735291, 1);      // 735291
rotateRightmostDigits(735291, 2);      // 735219
rotateRightmostDigits(735291, 3);      // 735912
rotateRightmostDigits(735291, 4);      // 732915
rotateRightmostDigits(735291, 5);      // 752913
rotateRightmostDigits(735291, 6);      // 352917


function rotateRightmostDigits(number, digit) {
  let digitArray = String(number).split('');
  let removedDigit = digitArray.splice(digitArray.length - digit, 1);
  digitArray.push(removedDigit);
  console.log(Number(digitArray.join('')));
}