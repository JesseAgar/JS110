swapName('Joe Roberts');    // "Roberts, Joe"

swapName('Karl Oskar Henriksson Ragvals');    // "Ragvals, Karl Oskar Henriksson"

function swapName(nameString) {
  let nameArray = nameString.split(' ');
  let lastName = nameArray.pop();
  console.log(lastName + ', ' + nameArray.join(' '));
}

