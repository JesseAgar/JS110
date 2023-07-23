const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const upperCaseLetters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();

letterCaseCount('abCdef 123');  // { lowercase: 5, uppercase: 1, neither: 4 }
letterCaseCount('AbCd +Ef');    // { lowercase: 3, uppercase: 3, neither: 2 }
letterCaseCount('123');         // { lowercase: 0, uppercase: 0, neither: 3 }
letterCaseCount('');            // { lowercase: 0, uppercase: 0, neither: 0 }


function letterCaseCount(string) {
  let caseCoutner = {
    lowercase: 0,
    uppercase: 0,
    neither: 0,
  };

  string.split('').forEach(char => {
    caseCoutner[upperLowerOrNeither(char)] += 1;
  });

  console.log(caseCoutner);
}

function upperLowerOrNeither(char) {
  if (lowerCaseLetters.includes(char)) {
    return 'lowercase';
  } else if (upperCaseLetters.includes(char)) {
    return 'uppercase';
  } else {
    return 'neither';
  }
}