'use strict'

// **************************************
// PHOTO GALLERY CAROUSEL
// **************************************
// photo gallery in index.html
let photoIndex = 1;

function swipePhoto(n) {
  photoIndex += n;
  showPhoto(photoIndex);
}

function showPhoto(n) {
  let galleryArray = document.getElementsByClassName("gallery-content");
  let galleryButtonBack = document.getElementsByClassName("gallery-button-back")[0];
  let galleryButtonNext = document.getElementsByClassName("gallery-button-next")[0];

  if (galleryArray && galleryArray.length > 0) {
    // find all tags with a, containing img tag
    let gallery = galleryArray[0];
    let photoLinks = gallery.children;
    if (photoLinks && photoLinks.length > 0) {
      let photos = Array.from(photoLinks).filter((photo) => {      
        return photo.tagName === "A";
      });

      // disable buttons at the ends of the line of photos
      if (photos && photos.length > 0) {
        if (n === 1) {
          galleryButtonBack.disabled = true;
        }
        else if (n === photos.length) {
          galleryButtonNext.disabled = true;
        }
        else {
          let galleryButtons = [galleryButtonBack, galleryButtonNext];
          for (let button of galleryButtons) {
            button.disabled = false;
          }
        }

        // designate display none for all photos
        for (let i = 0; i < photos.length; i++) {
          photos[i].style.display = "none";
        }
      }
      else {console.log("Фото нет");}

      // designate display block for the visible photo
      photos[photoIndex - 1].style.display = "block";
    }
  } else {console.log("Нет блока с фото");}
  
}


// **************************************
// APPOINTMENT FORM
// **************************************
// the appointment form in index.html
let form = document.querySelector(".appointment-form");
let dateInput = form.querySelector("#appointment-date");
let timeInput = form.querySelector("#appointment-time");
let nameInput = form.querySelector("#appointment-name");
let phoneInput = form.querySelector("#appointment-phone");

let isStorageSupport = true;

try {
  nameInput.value= localStorage.getItem("appointment-name");
  phoneInput.value = localStorage.getItem("appointment-phone");
} catch (err) {
  isStorageSupport = false;
}

form.addEventListener("submit", function(evt) {
  evt.preventDefault();
  if (!dateInput.value || !timeInput.value|| !nameInput.value || !phoneInput.value) {
    console.log("Нужно заполнить пустые поля");
  } else if (isStorageSupport) {
    localStorage.setItem("appointment-name", nameInput.value);
    localStorage.setItem("appointment-phone", phoneInput.value);
  }
});

// **************************************
// MODAL WINDOWS
// **************************************
// show modal window
function showModal(modalSelector) {
  let modal = document.querySelector(modalSelector);
  modal.style.display = "block";
}

// close modal window
function closeModal(modalSelector) {
  let modal = document.querySelector(modalSelector);
  modal.style.display =  "none";
}

// escape button to close the login window
window.addEventListener("keydown", function (evt) {
  console.log("test")
  if (evt.key === "27") {
    evt.preventDefault();
    if (popup.classList.contains("modal-show")) {
      popup.classList.remove("modal-show");
    }
  }
});
