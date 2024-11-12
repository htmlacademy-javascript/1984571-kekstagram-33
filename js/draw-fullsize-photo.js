import {thumbnails} from './draw-thumbnails.js';
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
    closeFullsizePhoto();
  }
};

function openFullsizePhoto() {
  modal.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeFullsizePhoto() {
  modal.classList.add('hidden');
}

const showComments = (allComments) => {
  for (let i = 0; i < allComments.length; i++) {
    const commentItemClone = commentItem.cloneNode(true);
    commentItemClone.querySelector('.social__picture').src = allComments[i].avatar;
    commentItemClone.querySelector('.social__picture').alt = allComments[i].name;
    commentItemClone.querySelector('.social__text').textContent = allComments[i].message;
    commentListFragment.appendChild(commentItemClone);
  }
  commentsContainer.appendChild(commentListFragment);
};


function transferModalData(evt, photoLink) {
  modalImg.src = evt.target.src;
  imgLikes.textContent = photoLink.querySelector('.picture__likes').textContent;
  imgComments.textContent = photoLink.querySelector('.picture__comments').textContent;
  shownComments.textContent = photoLink.querySelector('.picture__comments').textContent;
  photoDescription.textContent = photoLink.querySelector('.picture__img').alt;
  let minCommentIndex = 0;
  let step = 5;
  thumbnails.forEach((thumbnail) => {
    if (evt.target.src.includes(thumbnail.url)) {
      commentsContainer.innerHTML = '';

      showComments(thumbnail.comments.slice(minCommentIndex, step));
      shownComments.textContent = step;
      moreComments.addEventListener('click', () => {


        showComments(thumbnail.comments.slice(minCommentIndex += 5, step += 5));
        shownComments.textContent = step;
        if (thumbnail.comments.length <= step) {
          moreComments.classList.add('hidden');
          shownComments.textContent = thumbnail.comments.length;
        }

      });
    }
  });

}

closeButton.addEventListener('click', () => {
  closeFullsizePhoto();
});

export {transferModalData, openFullsizePhoto};
