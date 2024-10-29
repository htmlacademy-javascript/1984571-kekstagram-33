const getChecked = (string, maxLength) => string.length <= maxLength;

getChecked('проверяемая строка', 20);
getChecked('проверяемая строка', 18);
getChecked('проверяемая строка', 10);

const findPalidrom = (string) => {
  const normString = string.replaceAll(' ', '').toLowerCase();
  let emptyString = '';
  for (let i = normString.length - 1; i >= 0; i--) {
    emptyString += normString[i];
  }
  return emptyString === normString;
};

findPalidrom('топот');
findPalidrom('ДовОд');
findPalidrom('Кекс');
findPalidrom('Лёша на полке клопа нашёл ');


const getNumber = (string) => {
  const normString = string.toString();
  let stringWithNumber = '';
  for (let i = 0; i <= normString.length - 1; i++) {
    if (normString[i] === '0' || parseInt(normString[i], 10)) {
      stringWithNumber += normString[i];
    }
  }

  return stringWithNumber === '' ? NaN : Number(stringWithNumber);
};

getNumber('2023 год');
getNumber('ECMAScript 2022');
getNumber('1 кефир, 0.5 батона');
getNumber('агент 007');
getNumber('а я томат');

getNumber(2023);
getNumber(-1);
getNumber(1.5);


const getMeetingPossibility = (jobStart, jobEnd, meetingStart, meetingTime) => {
  jobStart = jobStart.split(':');
  jobStart = +jobStart[0] * 60 + +jobStart[1];
  jobEnd = jobEnd.split(':');
  jobEnd = +jobEnd[0] * 60 + +jobEnd[1];
  meetingStart = meetingStart.split(':');
  meetingStart = +meetingStart[0] * 60 + +meetingStart[1];
  const meetingEnd = meetingStart + meetingTime;
  if (meetingStart >= jobStart && meetingEnd <= jobEnd) {
    return true;
  }
  return false;
};

getMeetingPossibility('08:00', '17:30', '14:00', 90);
getMeetingPossibility('8:0', '10:0', '8:0', 120);
getMeetingPossibility('08:00', '14:30', '14:00', 90);
getMeetingPossibility('14:00', '17:30', '08:0', 90);
getMeetingPossibility('8:00', '17:30', '08:00', 900);
