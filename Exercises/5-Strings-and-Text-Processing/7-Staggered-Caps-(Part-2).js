
console.log(staggeredCase("I Love Launch School!", false) === "I lOvE lAuNcH sChOoL!");
console.log(staggeredCase("ALL CAPS") === "AlL cApS");
console.log(
  staggeredCase("ignore 77 the 444 numbers") === "IgNoRe 77 ThE 444 nUmBeRs"
);

function staggeredCase(inputString, factorNonChars = true) {
  let lastCharCap = false;
  let sillySttring = inputString.split('').map(char => {
    if (!char.match(/[a-z]/g) && !char.match(/[A-Z]/g) && factorNonChars) {
      return char;
    } else if (lastCharCap) {
      lastCharCap = false;
      return char.toLowerCase();
    } else {
      lastCharCap = true;
      return char.toUpperCase();
    }
  });

  console.log(sillySttring.join(''));
}