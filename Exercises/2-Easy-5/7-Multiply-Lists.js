multiplyList([3, 5, 7], [9, 10, 11]);    // [27, 50, 77]

function multiplyList(array1, array2) {
  let productList = [];

  for (let i = 0; i < array1.length; i++) {
    productList.push(array1[i] * array2[i]);
  }

  console.log(productList);
}