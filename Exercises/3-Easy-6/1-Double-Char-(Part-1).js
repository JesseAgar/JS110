const consonants = 'abcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQESTVWXY';

doubleConsonants('String');          // "SSttrrinngg"
doubleConsonants('Hello-World!');    // "HHellllo-WWorrlldd!"
doubleConsonants('July 4th');        // "JJullyy 4tthh"
doubleConsonants('');                // ""

function doubleConsonants(string) {
  console.log( string.split('').map(char => {
    if (consonants.includes(char)) {
      return char + char;
    } else {
      return char;
    }
  }).join(''));
}
