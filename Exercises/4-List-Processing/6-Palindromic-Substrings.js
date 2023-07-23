palindromes('abcd');       // []
palindromes('madam');      // [ "madam", "ada" ]

palindromes('hello-madam-did-madam-goodbye');
// returns
// [ "ll", "-madam-", "-madam-did-madam-", "madam", "madam-did-madam", "ada",
//   "adam-did-mada", "dam-did-mad", "am-did-ma", "m-did-m", "-did-", "did",
//   "-madam-", "madam", "ada", "oo" ]

palindromes('knitting cassettes');
// returns
// [ "nittin", "itti", "tt", "ss", "settes", "ette", "tt" ]


function palindromes(inputString) {
  let palidromes = [];

  for (let starChar = 0; starChar < inputString.length; starChar++) {
    let currentSubstring = inputString.slice(starChar);
    for (let charsFromEnd = 0;
      charsFromEnd < currentSubstring.length;
      charsFromEnd++) {
      let currentSubSubstring =
      currentSubstring.slice(0, currentSubstring.length - charsFromEnd);

      if (isPalindrome(currentSubSubstring) && currentSubSubstring.length > 1) {
        palidromes.push(currentSubSubstring);
      }
    }
  }

  console.log(palidromes);
}


function isPalindrome(inputString) {
  if (inputString === inputString.split('').reverse().join('')) {
    return true;
  } else {
    return false;
  }
}