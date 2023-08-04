
function pause(secondsToPause) {
  let msToPause = secondsToPause * 1000;
  const returnTrue = function() {
    return true;
  };
  const doNothing = function () {
  };
  let stopLoop = setTimeout(returnTrue, msToPause);

  while (true) {
    if (!stopLoop) break;
  }
}
pause(100);

console.log('a');


// function pause(secondsToPause) {
//   let currentTime = getCurrentTimeInSeconds();
//   let endTime = currentTime + secondsToPause;

//   while (currentTime < endTime) {
//     currentTime = getCurrentTimeInSeconds();
//   }
// }

// function getCurrentTimeInSeconds() {
//   return new Date().getTime() / 1000;
// }