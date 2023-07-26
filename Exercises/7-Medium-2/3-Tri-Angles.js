triangle(60, 70, 50);       // "acute"
triangle(30, 90, 60);       // "right"
triangle(120, 50, 10);      // "obtuse"
triangle(0, 90, 90);        // "invalid"
triangle(50, 50, 50);       // "invalid"

function triangle(...angles) {
  console.log(angles);
  if (!isTriangle(angles)) {
    console.log('invalid');
  } else if (angles.includes(90)) {
    console.log('right');
  } else if (isAcute(angles)) {
    console.log('acute');
  } else {
    console.log('obtuse');
  }
}

function isAcute(angles) {
  if (angles.every(angle => angle < 90)) {
    return true;
  } else {
    return false;
  }
}

function isTriangle(angles) {
  if (angles.includes(0)) {
    return false;
  } else if (sumOf(...angles) !== 180) {
    return false;
  } else {
    return true;
  }
}

function sumOf(...numbers) {
  return numbers.reduce((sum, number) => sum + number, 0);
}

