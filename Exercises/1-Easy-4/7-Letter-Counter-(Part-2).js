wordSizes('Four score and seven.');                       // { "3": 1, "4": 1, "5": 2 }
wordSizes('Hey diddle diddle, the cat and the fiddle!');  // { "3": 5, "6": 3 }
wordSizes("What's up doc?");                              // { "2": 1, "3": 1, "5": 1 }
wordSizes('');                                            // {}


function wordSizes(string) {
  let wordLengthCounter = {};

  let wordArray = string.split(' ');
  wordArray = removePunctuation(wordArray);

  wordArray.forEach(word => {
    wordLengthCounter[word.length] = wordLengthCounter[word.length] || 0;
    wordLengthCounter[word.length] += 1;
  });

  console.log(wordLengthCounter);
}

function removePunctuation(stringArray) {
  let letters = "qwertyuiopasdfghjklzxcvbnm";
  letters += letters.toUpperCase();

  return stringArray
    .map(string => string.split('')
      .filter(cha => letters.includes(cha))
      .join(''));
}