// fibonacci(1);
// fibonacci(2);
// fibonacci(3);
fibonacci(4);
// fibonacci(5);
// fibonacci(20);       // 6765
// fibonacci(50);       // 12586269025
// fibonacci(75);       // 2111485077978050

function fibonacci(n) {
  let lastAmount = 0;
  let currentAmount = 1;

  for (let digit = 2; digit <= n; digit++) {
    let store = currentAmount;
    currentAmount += lastAmount;
    lastAmount = store;
  }
  console.log(currentAmount);
}