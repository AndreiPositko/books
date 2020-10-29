import '../styles/index.scss';

/** Get elements from the DOM */

let btnAddBook = document.querySelector('.add__book');
let btnClosePopup = document.querySelector('.popup-close');
let overlay = document.querySelector('.overlay');
let btnEdit = document.querySelector('.popup__btn_edit');
let inputs = document.querySelectorAll('input');

console.log(inputs);

/** Show overlay */

btnAddBook.onclick = function () {
  overlay.classList.add('show');
};

/** Close overlay */

btnClosePopup.onclick = function () {
  overlay.classList.remove('show');
};

/** Close overlay clicking on another place of the window */

window.addEventListener('click', (e) => {
  if (e.target === overlay) {
    closePopup();
  }
});

/** Close overlay by clicking on the button close */
const closePopup = () => {
  overlay.classList.remove('show');
};

/** Edit text in popup's inputs */

btnEdit.addEventListener('click', () => {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
});
