star(43);


function star(size) {
  let totalGapsSize = size - 3;
  let innerGapSize = totalGapsSize / 2;
  let outerGapSize = 0;
  let topDiamond = [];

  while (innerGapSize >= 0) {
    let layer = makeSpaces(outerGapSize) + '*' + makeSpaces(innerGapSize) +
    '*' + makeSpaces(innerGapSize) + '*' + makeSpaces(outerGapSize);
    topDiamond.push(layer);
    innerGapSize -= 1;
    outerGapSize += 1;
  }

  let bottomDiamond = topDiamond.slice().reverse();

  let diamond = topDiamond.concat(makeStars(size), bottomDiamond);

  console.log(diamond.join('\n'));

}

function makeStars(numOfStars) {
  return '*'.repeat(numOfStars);
}
function makeSpaces(numOfSpaces) {
  return ' '.repeat(numOfSpaces);
}