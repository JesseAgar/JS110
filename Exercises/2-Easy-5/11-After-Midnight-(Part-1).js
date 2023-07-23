console.log(timeOfDay(0) === "00:00");
console.log(timeOfDay(-3) === "23:57");
console.log(timeOfDay(35) === "00:35");
console.log(timeOfDay(-1437) === "00:03");
console.log(timeOfDay(3000) === "02:00");
console.log(timeOfDay(800) === "13:20");
console.log(timeOfDay(-4231) === "01:29");

function timeOfDay(minSinceMidnight) {
  const MINUTES_PER_HOUR = 60;
  const HOURS_PER_DAY = 24;

  let minSinceLastMidnight = minSinceMidnight
    % (MINUTES_PER_HOUR * HOURS_PER_DAY);

  if (Math.sign(minSinceLastMidnight) === -1) {
    minSinceLastMidnight =
    (HOURS_PER_DAY * MINUTES_PER_HOUR) + minSinceLastMidnight;
  }

  let hours = Math.floor(minSinceLastMidnight / 60);
  let minutes = minSinceLastMidnight % 60;

  console.log(String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0'));
  return String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');
}