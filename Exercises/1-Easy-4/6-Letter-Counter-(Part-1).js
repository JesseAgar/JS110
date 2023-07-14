
wordSizes('Four score and seven.');                       // { "3": 1, "4": 1, "5": 1, "6": 1 }
wordSizes('Hey diddle diddle, the cat and the fiddle!');  // { "3": 5, "6": 1, "7": 2 }
wordSizes("What's up doc?");                              // { "2": 1, "4": 1, "6": 1 }
wordSizes('');                                            // {}


function wordSizes(string) {
  let wordLengthCounter = {};

  let wordArray = string.split(' ');

  wordArray.forEach(word => {
    wordLengthCounter[word.length] = wordLengthCounter[word.length] || 0;
    wordLengthCounter[word.length] += 1;
  });

  console.log(wordLengthCounter);
}