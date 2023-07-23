let memory = {
  1: 1,
  2: 1,
};

console.log(fibonnaci(1));
console.log(fibonnaci(2));
console.log(fibonnaci(3));
console.log(fibonnaci(4));
console.log(fibonnaci(5));
console.log(fibonnaci(6));
console.log(fibonnaci(7));
console.log(fibonnaci(8));
console.log(fibonnaci(9));

function fibonnaci(fibSequenceDigit) {
  if (Object.keys(memory).includes(String(fibSequenceDigit))) {
    return memory[String(fibSequenceDigit)];
  } else {
    memory[fibSequenceDigit] = fibonnaci(fibSequenceDigit - 1) + fibonnaci(fibSequenceDigit - 2)
    return memory[fibSequenceDigit];
  }
}