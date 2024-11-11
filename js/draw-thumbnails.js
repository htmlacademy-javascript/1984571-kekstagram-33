import {createDataPosts} from './create-data-posts.js';
const thumbnailsBlock = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnails = createDataPosts();
const thumbnailsListFragment = document.createDocumentFragment();
const displaysThumbnails = (thumbnailsList) => {
  thumbnailsList.forEach(({url, description, likes, comments}) => {
    const templateClone = thumbnailTemplate.cloneNode(true);
    templateClone.querySelector('.picture__img').src = url;
    templateClone.querySelector('.picture__img').alt = description;
    templateClone.querySelector('.picture__likes').textContent = likes;
    templateClone.querySelector('.picture__comments').textContent = comments.length;
    thumbnailsListFragment.appendChild(templateClone);
  });
  thumbnailsBlock.appendChild(thumbnailsListFragment);
};

export {displaysThumbnails, thumbnails};


