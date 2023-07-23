staggeredCase('I Love Launch School!');        // "I LoVe lAuNcH ScHoOl!"
staggeredCase('ALL_CAPS');                     // "AlL_CaPs"
staggeredCase('ignore 77 the 4444 numbers');   // "IgNoRe 77 ThE 4444 nUmBeRs"

function staggeredCase(inputString) {
  let lastCharCap = false;
  let sillySttring = inputString.split('').map(char => {
    if (lastCharCap) {
      lastCharCap = false
      return char.toLowerCase();
    } else {
      lastCharCap = true;
      return char.toUpperCase();
    }
  });

  console.log(sillySttring.join(''));
}