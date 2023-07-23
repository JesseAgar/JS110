function dms(degreesFloat) {
  const MINUTES_PER_DEGREE = 60;
  const SECONDS_PER_DEGREE = 60;
  let adjustedDegreesFloat = always360(degreesFloat);

  let degrees = Math.floor(adjustedDegreesFloat);
  let percentMinutes = adjustedDegreesFloat - degrees;
  let minutesFloat = MINUTES_PER_DEGREE * percentMinutes;
  let minutes = Math.floor(minutesFloat);
  let percentSeconds = minutesFloat - minutes;
  let seconds = Math.floor(SECONDS_PER_DEGREE * percentSeconds);

  let degreesWithUnits = degrees + '°';
  let minutesWithUnits = String(minutes).padStart(2, '0') + "'";
  let secondsWithUnits = String(seconds).padStart(2, '0') + '"';

  console.log(degreesWithUnits + minutesWithUnits + secondsWithUnits );
}

function always360(degrees) {
  if (Math.sign(degrees) === 1 || Math.sign(degrees) === 0) {
    return degrees % 360;
  }
  if (Math.sign(degrees) === -1) {
    return 360 + (degrees % 360);
  }
}

dms(30);           // 30°00'00"
dms(76.73);        // 76°43'48"
dms(454.6);        // 254°35'59"
dms(-93.034773);    // 93°02'05"
dms(0);            // 0°00'00"
dms(360);          // 360°00'00" or 0°00'00"