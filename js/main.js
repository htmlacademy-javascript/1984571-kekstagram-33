const NAMES = ['Федор', 'Камила', 'Полина', 'Сергей', 'Наталья', 'Филипп'];
const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const DESCRIPTIONS = ['Живописно!', 'Я фанат', 'Это мило', 'Мне нравится', 'Спасибо за фото', 'Просто магия', 'Фантастика', 'Ура! Ура! Ура!', 'Я в шоке', 'Реальные эмоции!'];

const idValues = {
  MIN: 1,
  MAX: 25,
};

const adressNumbers = {
  MIN: 1,
  MAX: 25,
};

const likesNumber = {
  MIN: 15,
  MAX: 200,
};

const commentsNumber = {
  MIN: 0,
  MAX: 30,
};

const avatarValues = {
  MIN: 1,
  MAX: 6,
};

const PHOTOS_NUMBER = 25;

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

const createRandomId = createRandomValuesRangeGenerator(idValues.MIN, idValues.MAX);
const createRandomAdress = createRandomValuesRangeGenerator(adressNumbers.MIN, adressNumbers.MAX);
const createRandomCommentId = createRandomValuesRangeGenerator(idValues.MIN, idValues.MAX);

const createComment = () => ({
  id: createRandomCommentId(),
  avatar: `img/avatar-${getRandomInteger(avatarValues.MIN, avatarValues.MAX)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});


const randomComments = Array.from({length: getRandomInteger(commentsNumber.MIN, commentsNumber.MAX)}, createComment);

const createPost = () => ({
  id: createRandomId(),
  url: `photos/{${createRandomAdress()}}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(likesNumber.MIN, likesNumber.MAX),
  comments: randomComments
});

const posts = Array.from({length: PHOTOS_NUMBER}, createPost);
