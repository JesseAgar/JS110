""
fridayThe13ths(1986);      // 1
fridayThe13ths(2015);      // 3
fridayThe13ths(2017);      // 2

function fridayThe13ths(yearToCheck) {
  let thisYear = new Date('Jan 13, ' + String(yearToCheck));
  let numberOfFri13ths = 0;

  while (thisYear.getFullYear() === yearToCheck) {
    if (isFriday(thisYear.getDay())) {
      numberOfFri13ths++;
    }

    thisYear.setMonth(thisYear.getMonth() + 1);
  }

  console.log(numberOfFri13ths);
}

function isFriday(day) {
  if (day === 5) {
    return true;
  } else {
    return false;
  }
}