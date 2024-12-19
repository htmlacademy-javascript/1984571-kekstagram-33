import {validateForm, blockEscapeAction, scallingPhoto, closePhotoEditForm, setUserFormSubmit} from './form.js';
import {openModal} from './draw-fullsize-photo.js';
import {displaysThumbnails} from './draw-thumbnails.js';
import {getData} from './api.js';


getData()
  .then((posts) => {
    displaysThumbnails(posts);
    const photosLinks = document.querySelectorAll('.picture');
    photosLinks.forEach((photoLink) => {
      photoLink.addEventListener('click', (evt) => openModal(evt, posts));
    });
  });

setUserFormSubmit(closePhotoEditForm);


validateForm();
blockEscapeAction();
scallingPhoto();

