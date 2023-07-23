console.log(afterMidnight("00:00") === 0);
console.log(beforeMidnight("00:00") === 0);
console.log(afterMidnight("12:34") === 754);
console.log(beforeMidnight("12:34") === 686);
console.log(afterMidnight("24:00") === 0);
console.log(beforeMidnight("24:00") === 0);

function afterMidnight(time) {
  const MIN_PER_HOUR = 60;
  const HOURS_PER_DAY = 24;
  const MIN_PER_DAY = MIN_PER_HOUR * HOURS_PER_DAY;

  let hoursSinceMidnight = +time.split(':')[0];
  let minutesSinceMidnight = +time.split(':')[1] + (hoursSinceMidnight * MIN_PER_HOUR);
  let minutesSinceLastMidnight = minutesSinceMidnight % MIN_PER_DAY;
  console.log(minutesSinceLastMidnight);
  return minutesSinceLastMidnight;
}

function beforeMidnight(time) {
  const MIN_PER_HOUR = 60;
  const HOURS_PER_DAY = 24;
  const MIN_PER_DAY = MIN_PER_HOUR * HOURS_PER_DAY;

  let hoursSinceMidnight = +time.split(':')[0];
  let minutesSinceMidnight = +time.split(':')[1] + (hoursSinceMidnight * MIN_PER_HOUR);
  let minutesSinceLastMidnight = ((MIN_PER_HOUR * HOURS_PER_DAY)
    - minutesSinceMidnight) % MIN_PER_DAY;
  console.log(minutesSinceLastMidnight);
  return minutesSinceLastMidnight;
}