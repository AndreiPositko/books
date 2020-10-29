import { template } from './template.js';

/** Get elements from the DOM */

let btnAddBook = document.querySelector('.add__book');
let btnClosePopup = document.querySelector('.popup-close');
let overlay = document.querySelector('.overlay');
let btnEdit = document.querySelector('.popup__btn_edit');
let inputs = document.querySelectorAll('input');

/** function - dreate element */

function createElement(tagName, className) {
    const element = document.createElement(tagName);
    element.classList = className;
    return element;
}

const bookLink = createElement('a', 'book__link');
const booksButtons = createElement('div', 'books__buttons');
const btn = createElement('button', 'btn');
const booksWrapper = createElement('div', 'books__wrapper');
const bookImg = createElement('img', 'book__img');
const booksInfo = createElement('div', 'books__info');
const titleBook = createElement('p', 'title__book');
const bookAuthor = createElement('p', 'book__author');
const bookPages = createElement('p', 'book__pages');
const bookQuality = createElement('p', 'book__quality');
const bookLanguage = createElement('p', 'book__language');
const publishingDate = createElement('p', 'publishing__date');
const blockDescription = createElement('div', 'block__description');
const descriptionName = createElement('p', 'description__name');
const descriptionText = createElement('p', 'description__text');

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

/** Get data from myServer */

let loadBooks = () => {
    const myServer = `http://localhost:3004/posts`;
    fetch(myServer)
        .then(function (responce) {
            return responce.json();
        })
        .then(function (data) {
            const ul = document.querySelector('.popup__list');
            const html = data.map(function (item) {
                return '<li></li>'
            })
            console.log(data);
        });
};
loadBooks();