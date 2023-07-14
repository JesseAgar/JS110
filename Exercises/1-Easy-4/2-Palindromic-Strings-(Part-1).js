function isRealPalindrome(inputString) {
  if (inputString === inputString.split('').reverse().join('')) {
    console.log('is palindrome');
  } else {
    console.log('is not palidrome');
  }
}
isRealPalindrome('madam');               // true
isRealPalindrome('Madam');               // false (case matters)
isRealPalindrome("madam i'm adam");      // false (all characters matter)
isRealPalindrome('356653');              // true