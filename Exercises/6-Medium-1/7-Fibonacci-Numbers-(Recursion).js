let fibonacciSequence = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

console.log(fibonacci(1));       // 1
console.log(fibonacci(2));       // 1
console.log(fibonacci(3));       // 2
console.log(fibonacci(4));       // 3
console.log(fibonacci(5));       // 5
console.log(fibonacci(12));      // 144
console.log(fibonacci(20));      // 6765

function fibonacci(digit) {
  if (digit <= 2) {
    return 1;
  } else {
    return fibonacci(digit - 1) + fibonacci(digit - 2);
  }
}
