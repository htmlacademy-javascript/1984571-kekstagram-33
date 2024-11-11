import {displaysThumbnails, thumbnails} from './draw-thumbnails.js';
import {transferModalData, openFullsizePhoto} from './draw-fullsize-photo.js';
displaysThumbnails(thumbnails);

const photosLinks = document.querySelectorAll('.picture');

photosLinks.forEach((photoLink) => {
  photoLink.addEventListener('click', (evt) => {
    openFullsizePhoto();
    document.body.classList.add('modal-open');
    transferModalData(evt, photoLink);
  });
});


