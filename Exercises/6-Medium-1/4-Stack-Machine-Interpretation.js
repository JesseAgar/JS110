const operations = {
  PUSH: function(data) {
    data.stack.push(data.register);
  },
  ADD: function(data) {
    data.register += data.stack.pop();
  },
  SUB: function(data) {
    data.register -= data.stack.pop();
  },
  MULT: function(data) {
    data.register *= data.stack.pop();
  },
  DIV: function(data) {
    data.register /= data.stack.pop();
  },
  REMAINDER: function(data) {
    data.register %= data.stack.pop();
  },
  POP: function(data) {
    data.register = data.stack.pop();
  },
  PRINT: function(data) {
    console.log(data.register);
  },
};

function minilang(orders) {
  let stackAndRegister = {
    register: 0,
    stack: [],
  };

  let ordersArray = orders.split(' ');

  ordersArray.forEach(order => {
    if (order.match(/[0-9]+/)) {
      stackAndRegister.register = Number(order);
      console.log(stackAndRegister);
    } else {
      operations[order](stackAndRegister);
      console.log(stackAndRegister);
    }
  });
  console.log('');
}

minilang('3 PUSH PUSH 7 DIV MULT PRINT');
// 6



// minilang('-3 PUSH 5 SUB PRINT');
// // 8

// minilang('4 PUSH PUSH 7 REMAINDER MULT PRINT');
// // 12


// minilang('6 PUSH');
// (nothing is printed because the `program` argument has no `PRINT` commands)

// minilang('PRINT');
// // 0

// minilang('5 PUSH 3 MULT PRINT');
// // 15

// minilang('5 PRINT PUSH 3 PRINT ADD PRINT');
// // 5
// // 3
// // 8

// minilang('5 PUSH POP PRINT');
// // 5

// minilang('3 PUSH 4 PUSH 5 PUSH PRINT ADD PRINT POP PRINT ADD PRINT');
// // 5
// // 10
// // 4
// // 7

