let transactions = [ { id: 101, movement: 'in',  quantity:  5 },
                     { id: 105, movement: 'in',  quantity: 10 },
                     { id: 102, movement: 'out', quantity: 17 },
                     { id: 101, movement: 'in',  quantity: 12 },
                     { id: 103, movement: 'out', quantity: 20 },
                     { id: 102, movement: 'out', quantity: 15 },
                     { id: 105, movement: 'in',  quantity: 25 },
                     { id: 101, movement: 'out', quantity: 18 },
                     { id: 102, movement: 'in',  quantity: 22 },
                     { id: 103, movement: 'out', quantity: 15 }, ];

isItemAvailable(101, transactions);     // false
isItemAvailable(103, transactions);     // false
isItemAvailable(105, transactions);     // true

console.log(transactionsFor(103, transactions));

function isItemAvailable(id, transactionsArray) {
  let filteredTransactions = transactionsFor(id, transactionsArray);

  let totalItems = filteredTransactions.reduce((acc, transaction) => {
    if (transaction.movement === 'in') {
      return acc += transaction.quantity;
    }
    if (transaction.movement === 'out') {
      return acc -= transaction.quantity;
    }
  }, 0);

  console.log(totalItems > 0);
}


function transactionsFor(id, transactionsArray) {
  return transactionsArray.filter(transaction => {
    return transaction.id === id;
  });
}