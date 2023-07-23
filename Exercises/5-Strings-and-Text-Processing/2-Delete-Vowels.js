removeVowels(['abcdefghijklmnopqrstuvwxyz']);         // ["bcdfghjklmnpqrstvwxyz"]
removeVowels(['green', 'YELLOW', 'black', 'white']);  // ["grn", "YLLW", "blck", "wht"]
removeVowels(['ABC', 'AEIOU', 'XYZ']);                // ["BC", "", "XYZ"]


function removeVowels(stringArray) {
  const vowels = 'aeiou' + 'aeiou'.toUpperCase();
  console.log(stringArray.map(string => {
    return string.split('').filter(char => {
      return !vowels.includes(char);
    })
  }).map(charArray => charArray.join('')));
}