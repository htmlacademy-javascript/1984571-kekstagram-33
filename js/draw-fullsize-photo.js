import {isEscapeKey} from './util.js';

const modal = document.querySelector('.big-picture');
const modalImg = document.querySelector('.big-picture__img').children[0];
const imgLikes = document.querySelector('.likes-count');
const imgComments = document.querySelector('.social__comment-total-count');
const commentsContainer = document.querySelector('.social__comments');
const commentItem = commentsContainer.querySelector('.social__comment');
const shownComments = document.querySelector('.social__comment-shown-count');
const closeButton = document.querySelector('.big-picture__cancel');
const photoDescription = document.querySelector('.social__caption');
const moreComments = document.querySelector('.comments-loader');
const commentListFragment = document.createDocumentFragment();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const cutsComments = (comments, minCommentIndex, step) => function() {
  if (step > comments.length) {
    step = comments.length;
    moreComments.classList.add('hidden');
    shownComments.textContent = comments.length;
  } else {
    shownComments.textContent = step;
    moreComments.classList.remove('hidden');
  }
  for (let i = minCommentIndex; i < step; i++) {
    const commentItemClone = commentItem.cloneNode(true);
    commentItemClone.querySelector('.social__picture').src = comments[i].avatar;
    commentItemClone.querySelector('.social__picture').alt = comments[i].name;
    commentItemClone.querySelector('.social__text').textContent = comments[i].message;
    commentListFragment.appendChild(commentItemClone);
  }
  commentsContainer.appendChild(commentListFragment);
  minCommentIndex += 5;
  step += 5;
};

let showComments;
const transferModalData = (evt, thumbnails) => {
  modalImg.src = evt.target.src;
  imgLikes.textContent = evt.target.parentElement.querySelector('.picture__likes').textContent;
  imgComments.textContent = evt.target.parentElement.querySelector('.picture__comments').textContent;
  shownComments.textContent = evt.target.parentElement.querySelector('.picture__comments').textContent;
  photoDescription.textContent = evt.target.parentElement.querySelector('.picture__img').alt;
  thumbnails.forEach((thumbnail) => {
    if (evt.target.src.includes(thumbnail.url)) {
      commentsContainer.innerHTML = '';
      showComments = cutsComments(thumbnail.comments, 0, 5);
      showComments();
      moreComments.addEventListener('click', showComments);
    }
  });
};

const openModal = (evt, thumbnails) => {
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  transferModalData(evt, thumbnails);
};
const closeModal = () => {
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  moreComments.removeEventListener('click', showComments);
};

closeButton.addEventListener('click', closeModal);

export {openModal};
