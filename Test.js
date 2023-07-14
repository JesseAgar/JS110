let string = 'asdfewtcbsdgwerasdgzxcvwasdfZZZZ';

function countObject() {
  let array = string.split('');
  let obj = {};
  array.forEach(element => {
    obj[element] = obj[element] || 0;
    obj[element] += 1;
  })

  return obj
}

console.log(countObject(string));