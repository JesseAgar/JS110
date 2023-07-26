diamond(1);
diamond(3);
diamond(9);


function diamond(thickness) {
  let diamondArray = [];
  let diamondBottom = [];

  for (let layerThickness = thickness - 2; layerThickness > 0; layerThickness -= 2) {
    if (thickness < 0) break;
    let numOfLeadingSpaces = diamondBottom.length + 1;
    let leadingSpaces = makeSpaces(numOfLeadingSpaces);
    let stars = makeStars(layerThickness);
    let layer = leadingSpaces + stars;
    diamondBottom.push(layer);
  }

  diamondArray = diamondArray.concat(diamondBottom.slice().reverse(), makeStars(thickness), diamondBottom);
  console.log(diamondArray.join('\n'));
}

function makeStars(numOfStars) {
  return '*'.repeat(numOfStars);
}

function makeSpaces(numOfSpaces) {
  return ' '.repeat(numOfSpaces);
}
