const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createRandomValuesRangeGenerator = (min, max) => {
  const previosVales = [];

  return () => {
    let currentValue = getRandomInteger(min, max);
    if (previosVales.length >= (max - min + 1)) {
      return null;
    }
    while (previosVales.includes(currentValue)){
      currentValue = getRandomInteger(min, max);
    }
    previosVales.push(currentValue);
    return currentValue;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomInteger, getRandomArrayElement, createRandomValuesRangeGenerator, isEscapeKey};
