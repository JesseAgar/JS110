buyFruit([['apple', 3], ['orange', 1], ['banana', 2]]);
// returns ["apple", "apple", "apple", "orange", "banana", "banana"]

function buyFruit(groceryList) {
  let eachItemToBuy = [];
  groceryList.forEach(listEntry => {
    eachItemToBuy.push(...' '.repeat(listEntry[1]).split('').fill(listEntry[0]));
  });

  console.log(eachItemToBuy);
}
