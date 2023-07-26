triangle(3, 3, 3);        // "equilateral"
triangle(3, 3, 1.5);      // "isosceles"
triangle(3, 4, 5);        // "scalene"
triangle(0, 3, 3);        // "invalid"
triangle(3, 1, 1);        // "invalid"

function triangle(sideA, sideB, sideC) {
  let triangleLengths = [sideA, sideB, sideC].sort((a, b) => a - b);
  console.log(triangleLengths);

  if (!isTriangle(triangleLengths)) {
    console.log('invalid');
  } else if (isEquilateral(triangleLengths)) {
    console.log('equilateral');
  } else if (isIsosceles(triangleLengths)) {
    console.log('isosceles');
  } else {
    console.log('scalene');
  }
}

function isTriangle(triangle) {
  return triangle[0] + triangle[1] > triangle[2];
}

function isEquilateral(triangle) {
  if (triangle[0] === triangle[1] && triangle[0] === triangle[2]) {
    return true;
  }
}

function isIsosceles(triangle) {
  if ((triangle[0] === triangle[1] && triangle[0] !== triangle[2]) || 
  (triangle[1] === triangle[2] && triangle[1] !== triangle[0])) {
    return true;
  }
}
