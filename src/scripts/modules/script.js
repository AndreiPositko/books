import { bookTemplate } from './bookTemplate';

/** Get elements from the DOM */

let btnAddBook = document.querySelector('.add__book');
let btnClosePopup = document.querySelector('.popup-close');
let overlay = document.querySelector('.overlay');
let btnEdit = document.querySelector('.popup__btn_edit');
let inputs = document.querySelectorAll('input');
let listBooks = document.querySelector('.list__books');
const myServer = `http://localhost:3004/posts`;


/** function - dreate element */

function createElement(tagName, className) {
    const element = document.createElement(tagName);
    element.classList = className;
    return element;
}

// const bookLink = createElement('a', 'book__link');
// const booksButtons = createElement('div', 'books__buttons');
// const btn = createElement('button', 'btn');
// const booksWrapper = createElement('div', 'books__wrapper');
// const bookImg = createElement('img', 'book__img');
// const booksInfo = createElement('div', 'books__info');
// const titleBook = createElement('p', 'title__book');
// const bookAuthor = createElement('p', 'book__author');
// const bookPages = createElement('p', 'book__pages');
// const bookQuality = createElement('p', 'book__quality');
// const bookLanguage = createElement('p', 'book__language');
// const publishingDate = createElement('p', 'publishing__date');
// const blockDescription = createElement('div', 'block__description');
// const descriptionName = createElement('p', 'description__name');
// const descriptionText = createElement('p', 'description__text');

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
    listBooks.innerHTML = '';
    
    fetch(myServer)
        .then(function (responce) {
            return responce.json();
        })
        .then(function (serverBooks) {
          serverBooks.forEach(bookItem => {
            const liWrapper = createElement('li', 'book__item');
            console.log(bookItem.pages);
            liWrapper.innerHTML = bookTemplate;

            let titleBook = liWrapper.querySelector('.title__book');
            let author = liWrapper.querySelector('.book__author');
            let pages = liWrapper.querySelector('.book__pages');
            let quality = liWrapper.querySelector('.book__quality');
            let bookLanguage = liWrapper.querySelector('.book__language');
            let yearOfProduction = liWrapper.querySelector('.publishing__date');
            let descriptionName = liWrapper.querySelector('.description__name');
            let descriptionText = liWrapper.querySelector('.description__text');
            let imgBook = liWrapper.querySelector('.book__img');

            titleBook.innerHTML = `<b>Название:</b> ${bookItem.title}`;
            author.innerHTML = `<b>Автор:</b> ${bookItem.author}`;
            pages.innerHTML = `<b>Страниц:</b> ${bookItem.pages}`;
            quality.innerHTML = `<b>Качество:</b> ${bookItem.quality}`;
            bookLanguage.innerHTML = `<b>Язык:</b> ${bookItem.language}`;
            yearOfProduction.inner = `<b>Год издания:</b> ${bookItem}`;
            descriptionName.innerHTML = `<b>Описание:</b>`;
            descriptionText.innerHTML = `${bookItem.description}`;
            imgBook.setAttribute('src', bookItem.imgBook);
                          
            listBooks.appendChild(liWrapper);
            });
        });
};
loadBooks();