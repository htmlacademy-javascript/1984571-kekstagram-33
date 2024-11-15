import {isEscapeKey} from './util.js';

const buttonOpenForm = document.querySelector('.img-upload__input');
const inputHashtagsText = document.querySelector('.text__hashtags');
const overlayForm = document.querySelector('.img-upload__overlay');
const buttonCloseForm = document.querySelector('.img-upload__cancel');
const photoEditForm = document.querySelector('.img-upload__form');
const commentArea = document.querySelector('.text__description');
const buttonUploadForm = document.querySelector('.img-upload__submit');

const disableButtonUploadForm = () => {
  buttonUploadForm.disabled = true;
};

const undisableButtonUploadForm = () => {
  buttonUploadForm.disabled = false;
};

const closePhotoEditForm = () => {
  overlayForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoEditForm();
  }
};

buttonCloseForm.addEventListener('click', closePhotoEditForm);

buttonOpenForm.addEventListener('change', () => {
  if (buttonOpenForm.value) {
    overlayForm.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
  }
});


const pristine = new Pristine(photoEditForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});


const checkHashtagsLength = (value) => {
  const hashtagsArray = value.split(' ');
  for (let i = 0; i < hashtagsArray.length; i++) {
    if (hashtagsArray[i].length >= 1 && hashtagsArray[i].length <= 20) {
      undisableButtonUploadForm();
      return true;
    } else {
      disableButtonUploadForm();
      return false;
    }
  }
};

const getHashtagLengthError = () => ('Хэштег должен содержать от 1 до 20 символов');


const findStringSpaces = (value) => {
  let flag = true;
  for (let i = 1; i < value.length; i++) {
    if(value[i] === '#' && value[i - 1] !== ' ') {
      flag = false;
      disableButtonUploadForm();
    }
  }
  return flag;
};

const getSpaceError = () => ('Поставьте пробел между хэштегами!');


photoEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const compareHastags = (value) => {
  let flag = true;
  const hastagsArray = value.split(' ');
  for (let i = 0; i < hastagsArray.length; i++) {
    for (let j = i + 1; j < hastagsArray.length; j++) {
      if (hastagsArray[i] === hastagsArray[j] && hastagsArray[i]) {
        flag = false;
        disableButtonUploadForm();
      }
    }
  }
  return flag;
};

const getSameHastagsError = () => ('Хэштеги не должны быть одинаковыми!');


const checkArrayLength = (value) => {
  let hashtagsArray = value.split(' ');
  hashtagsArray = hashtagsArray.filter((hashtag) => (hashtag !== ''));
  if (!hashtagsArray.length <= 5) {
    disableButtonUploadForm();
  }
  return hashtagsArray.length <= 5;
};

const getHashtagsNumberError = () => ('Введите не больше 5 хэштегов!');


const checkHashtagValidity = (value) => {
  let hashtagsArray = value.split(' ');
  hashtagsArray = hashtagsArray.filter((hashtag) => (hashtag !== ''));
  const regex = /^#[a-zа-яё0-9]{1,19}$/i;
  let flag = true;
  hashtagsArray.forEach((hashtag) => {
    if (!regex.test(hashtag)) {
      flag = false;
      disableButtonUploadForm();
    } else {
      undisableButtonUploadForm();
    }
  });
  return flag;
};

function getHashtagValidityError () {
  return ('Хэштег должен начинаться с символа # и состоять из букв и чисел!');
}


const findCommentLength = (value) => {
  if (value.length < 140) {
    undisableButtonUploadForm();
    return true;
  } else {
    disableButtonUploadForm();
    return false;
  }
};

const getCommentError = () => ('Комментарий не может составлять больше 140 символов!');


inputHashtagsText.onfocus = () => {
  inputHashtagsText.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });
};

commentArea.onfocus = () => {
  commentArea.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });
};

const validateForm = () => {
  pristine.addValidator(inputHashtagsText, checkHashtagsLength, getHashtagLengthError);
  pristine.addValidator(inputHashtagsText, findStringSpaces, getSpaceError);
  pristine.addValidator(inputHashtagsText, compareHastags, getSameHastagsError);
  pristine.addValidator(inputHashtagsText, checkArrayLength, getHashtagsNumberError);
  pristine.addValidator(inputHashtagsText, checkHashtagValidity, getHashtagValidityError);
  pristine.addValidator(commentArea, findCommentLength, getCommentError);
};

const blockEscapeAction = () => {
  inputHashtagsText.onfocus = () => {
    inputHashtagsText.addEventListener('keydown', (evt) => {
      evt.stopPropagation();
    });
  };

  commentArea.onfocus = () => {
    commentArea.addEventListener('keydown', (evt) => {
      evt.stopPropagation();
    });
  };
};

export {validateForm, blockEscapeAction};


