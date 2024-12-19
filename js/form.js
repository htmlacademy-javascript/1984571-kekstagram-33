import {isEscapeKey} from './util.js';

const buttonOpenForm = document.querySelector('.img-upload__input');
const inputHashtagsText = document.querySelector('.text__hashtags');
const overlayForm = document.querySelector('.img-upload__overlay');
const buttonCloseForm = document.querySelector('.img-upload__cancel');
const photoEditForm = document.querySelector('.img-upload__form');
const commentArea = document.querySelector('.text__description');
const buttonUploadForm = document.querySelector('.img-upload__submit');
const photoZoomButton = document.querySelector('.scale__control--bigger');
const photoZoomoutButton = document.querySelector('.scale__control--smaller');
const photoScaleValue = document.querySelector('.scale__control--value');
const photoForm = document.querySelector('.img-upload__preview');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderEffectsList = document.querySelector('.effects__list');
const sliderElementContainer = document.querySelector('.img-upload__effect-level');
const successMessageTemplate = document.querySelector('#success').content;
const successMessageClone = successMessageTemplate.cloneNode(true);
const successMessage = document.createDocumentFragment();
const errorMessageTemplate = document.querySelector('#error').content;
const errorMessageClone = errorMessageTemplate.cloneNode(true);
const errorMessage = document.createDocumentFragment();


const scallingPhoto = () => {
  const step = 25;
  photoZoomButton.addEventListener('click', () => {
    let numericScaleValue = photoScaleValue.value.replace('%', '');
    numericScaleValue *= 1;
    if (numericScaleValue <= 75) {
      numericScaleValue += step;
      photoScaleValue.value = `${numericScaleValue }%`;
      photoForm.style.transform = `scale(${numericScaleValue / 100})`;
    }
  });

  photoZoomoutButton.addEventListener('click', () => {
    let numericScaleValue = photoScaleValue.value.replace('%', '');
    numericScaleValue *= 1;
    if (numericScaleValue >= 50) {
      numericScaleValue -= step;
      photoScaleValue.value = `${numericScaleValue }%`;
      photoForm.style.transform = `scale(${numericScaleValue / 100})`;
    }
  });

};


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

const clearModalData = () => {
  photoForm.style.transform = `scale(${1})`;
  photoForm.style.filter = 'none';
  photoScaleValue.value = `${100}%`;
  sliderElement.classList.add('hidden');
  sliderElementContainer.classList.add('hidden');
  inputHashtagsText.value = '';
  commentArea.value = '';
  buttonOpenForm.value = '';
};

const setUserFormSubmit = (onSuccess) => {
  photoEditForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      fetch(
        'https://32.javascript.htmlacademy.pro/kekstagram',
        {
          method: 'POST',
          body: formData,
        },
      ).then((response) => {
        if (response.ok) {
          onSuccess();
          clearModalData();
          successMessage.appendChild(successMessageClone);
          document.body.appendChild(successMessage);
          const successModal = document.querySelector('.success');
          const successButton = document.querySelector('.success__button');
          // const successInner = document.querySelector('.success__inner');
          successButton.addEventListener('click', () => {
            successModal.classList.add('hidden');
          });
          document.addEventListener('keydown', (evt) => {
            if (isEscapeKey(evt)) {
              successModal.classList.add('hidden');
            }
          });
          document.addEventListener('click', (evt) => {
            if (evt.target.className !== 'success__inner') {
              successModal.classList.add('hidden');
            }
          });
          successModal.classList.remove('hidden');
        }
      })
        .catch(() => {
          errorMessage.appendChild(errorMessageClone);
          document.body.appendChild(errorMessage);
          const errorModal = document.querySelector('.error');
          const errorButton = document.querySelector('.error__button');
          errorButton.addEventListener('click', () => {
            errorModal.classList.add('hidden');
          });
          document.addEventListener('keydown', (evt) => {
            if (isEscapeKey(evt)) {
              errorModal.classList.add('hidden');
            }
          });
          document.addEventListener('click', (evt) => {
            if (evt.target.className !== 'error__inner') {
              errorModal.classList.add('hidden');
            }
          });
          errorModal.classList.remove('hidden');
        });
    }
  });
};

buttonCloseForm.addEventListener('click', clearModalData);

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

const sliderSettings = {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1
};

noUiSlider.create(sliderElement, sliderSettings);

const setPhotoEffectValue = (effect,unit) => {
  sliderElement.noUiSlider.on('update', () => {
    const effectLevel = sliderElement.noUiSlider.get();
    if (effect === 'none'){
      sliderElement.classList.add('hidden');
      sliderElementContainer.classList.add('hidden');
      photoForm.style.filter = effect;
    } else {
      sliderElement.classList.remove('hidden');
      sliderElementContainer.classList.remove('hidden');
      photoForm.style.filter = `${effect }(${ effectLevel }${unit })`;
    }
  });
};

setPhotoEffectValue('none','');
sliderEffectsList.addEventListener('click', (evt) => {
  let effect;
  let unit = '';
  if (evt.target.nodeName === 'INPUT') {
    switch(evt.target.value){
      case 'none':
        sliderSettings.range.max = 0;
        sliderSettings.step = 0;
        effect = 'none';
        break;
      case 'chrome':
        effect = 'grayscale';
        unit = '';
        break;
      case 'sepia':
        effect = 'sepia';
        unit = '';
        break;
      case 'marvin':
        sliderSettings.range.max = 100;
        sliderSettings.step = 1;
        effect = 'invert';
        unit = '%';
        break;
      case 'phobos':
        sliderSettings.range.max = 3;
        effect = 'blur';
        unit = 'px';
        break;
      case 'heat':
        sliderSettings.range.min = 1;
        sliderSettings.range.max = 3;
        effect = 'brightness';
        unit = '';
        break;
    }
    sliderElement.noUiSlider.updateOptions(sliderSettings);
    setPhotoEffectValue(effect,unit);
  }
});

export {validateForm, blockEscapeAction, scallingPhoto, closePhotoEditForm, setUserFormSubmit};
