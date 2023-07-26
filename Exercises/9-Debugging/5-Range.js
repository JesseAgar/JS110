function range(start, end) {
  let range = [];
  if (end === undefined) {
    end = start;
    start = 0;
  }
  for (let element = start; element <= end; element++) {
    range.push(element);
  }

  return range;
}



// Examples

console.log(range(10, 20));
console.log(range(5));