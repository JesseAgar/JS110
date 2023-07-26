letterPercentages('abCdef 123');
// { lowercase: "50.00", uppercase: "10.00", neither: "40.00" }

letterPercentages('AbCd +Ef');
// { lowercase: "37.50", uppercase: "37.50", neither: "25.00" }

letterPercentages('123');
// { lowercase: "0.00", uppercase: "0.00", neither: "100.00" }


function letterPercentages(inputString) {
  let count = {
    lowercase: 0,
    uppercase: 0,
    neither: 0,
  }
  countDigits(inputString, count);
  let totalCharacters = Object.values(count).reduce((count, total) => total + count, 0);

  let lowerCasePercent = (count.lowercase / totalCharacters * 100).toFixed(2);
  let upperCasePercent = (count.uppercase / totalCharacters * 100).toFixed(2);
  let neitherPercent = (count.neither / totalCharacters * 100).toFixed(2);

  let percentages = {
    lowercase: lowerCasePercent,
    uppercase: upperCasePercent,
    neither: neitherPercent,
  }

  console.log(percentages);
}

function countDigits(string, counter) {
  counter.lowercase = (string.match(/[a-z]/g) || []).length;
  counter.uppercase = (string.match(/[A-Z]/g) || []).length;
  counter.neither = (string.match(/[^a-z]/gi) || []).length;
}