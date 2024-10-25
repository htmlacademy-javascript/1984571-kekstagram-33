const getChecked = (string, maxLength) => string.length <= maxLength;

// Строка короче 20 символов
console.log(getChecked('проверяемая строка', 20)); // true
// Длина строки ровно 18 символов
console.log(getChecked('проверяемая строка', 18)); // true
// Строка длиннее 10 символов
console.log(getChecked('проверяемая строка', 10)); // false

const findPalidrom = (string) => {
  let normString = string.replaceAll(' ', '').toLowerCase();
  let emptyString = '';
  for (let i = normString.length-1; i >= 0; i--) {
    emptyString += normString[i];
  }
  return emptyString === normString;
}
// Строка является палиндромом
console.log(findPalidrom('топот')); // true
// Несмотря на разный регистр, тоже палиндром
console.log(findPalidrom('ДовОд')); // true
// Это не палиндром
console.log(findPalidrom('Кекс'));  // false
// Это палиндром
console.log(findPalidrom('Лёша на полке клопа нашёл ')); // true


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

console.log(getNumber('2023 год'));            // 2023
console.log(getNumber('ECMAScript 2022'));     // 2022
console.log(getNumber('1 кефир, 0.5 батона')); // 105
console.log(getNumber('агент 007'));           // 7
console.log(getNumber('а я томат'));           // NaN

console.log(getNumber(2023)); // 2023
console.log(getNumber(-1));   // 1
console.log(getNumber(1.5));  // 15


