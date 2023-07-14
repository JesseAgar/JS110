function isRealPalindrome(inputString) {
  let lettersAndNums = '1234567890poiuytrewqasdfghjklmnbvcxz';
  inputString = inputString.toLowerCase().split('').filter( char => {
    return lettersAndNums.includes(char);
  }).join('');

  if (inputString === inputString.split('').reverse().join('')) {
    console.log('is palindrome');
  } else {
    console.log('is not palidrome');
  }
}
isRealPalindrome('madam');               // true
isRealPalindrome('Madam');               // true (case does not matter)
isRealPalindrome("Madam, I'm Adam");     // true (only alphanumerics matter)
isRealPalindrome('356653');              // true
isRealPalindrome('356a653');             // true
isRealPalindrome('123ab321');            // false