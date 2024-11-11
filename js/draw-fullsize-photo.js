import {thumbnails} from './draw-thumbnails.js';
import {isEscapeKey} from './util.js';

const modal = document.querySelector('.big-picture');
const modalImg = document.querySelector('.big-picture__img').children[0];
const imgLikes = document.querySelector('.likes-count');
const imgComments = document.querySelector('.social__comment-total-count');
const commentsContainer = document.querySelector('.social__comments');
const commentItem = commentsContainer.querySelector('.social__comment');
const shownComments = document.querySelector('.social__comment-shown-count');
const commentsCounter = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const closeButton = document.querySelector('.big-picture__cancel');
const photoDescription = document.querySelector('.social__caption');
const commentListFragment = document.createDocumentFragment();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullsizePhoto();
  }
};

function openFullsizePhoto() {
  modal.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
}

commentsCounter.classList.add('hidden');
commentsLoader.classList.add('hidden');

function closeFullsizePhoto() {
  modal.classList.add('hidden');
}

const showComments = (allComments) => {
  allComments.forEach((comment) => {
    const commentItemClone = commentItem.cloneNode(true);
    commentItemClone.querySelector('.social__picture').src = comment.avatar;
    commentItemClone.querySelector('.social__picture').alt = comment.name;
    commentItemClone.querySelector('.social__text').textContent = comment.message;
    commentListFragment.appendChild(commentItemClone);
  });
  commentsContainer.innerHTML = '';
  commentsContainer.appendChild(commentListFragment);
};

function transferModalData(evt, photoLink) {
  modalImg.src = evt.target.src;
  imgLikes.textContent = photoLink.querySelector('.picture__likes').textContent;
  imgComments.textContent = photoLink.querySelector('.picture__comments').textContent;
  shownComments.textContent = photoLink.querySelector('.picture__comments').textContent;
  photoDescription.textContent = photoLink.querySelector('.picture__img').alt;
  thumbnails.forEach((thumbnail) => {
    if (evt.target.src.includes(thumbnail.url)) {
      showComments(thumbnail.comments);
    }
  });
}

closeButton.addEventListener('click', () => {
  closeFullsizePhoto();
});

export {transferModalData, openFullsizePhoto};
