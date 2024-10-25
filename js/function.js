const getChecked = (string, maxLength) => string.length <= maxLength;

getChecked('проверяемая строка', 20);
getChecked('проверяемая строка', 18);
getChecked('проверяемая строка', 10);

const findPalidrom = (string) => {
  let normString = string.replaceAll(' ', '').toLowerCase();
  let emptyString = '';
  for (let i = normString.length-1; i >= 0; i--) {
    emptyString += normString[i];
  }
  return emptyString === normString;
}

findPalidrom('топот');
findPalidrom('ДовОд');
findPalidrom('Кекс');  // false
findPalidrom('Лёша на полке клопа нашёл '); // true


const getNumber = (string) => {
  let normString = string.toString();
  let stringWithNumber = '';
  for (let i = 0; i <= normString.length - 1; i++) {
    if (normString[i] ==='0' || parseInt(normString[i])) {
      stringWithNumber += normString[i];
    }
  }

  return stringWithNumber === '' ? NaN : Number(stringWithNumber);
}

getNumber('2023 год');            // 2023
getNumber('ECMAScript 2022');     // 2022
getNumber('1 кефир, 0.5 батона'); // 105
getNumber('агент 007');           // 7
getNumber('а я томат');           // NaN

getNumber(2023); // 2023
getNumber(-1);   // 1
getNumber(1.5);  // 15


