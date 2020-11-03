import { bookTemplate } from './bookTemplate';

/** Get elements from the DOM */
const btnEditOverlay = document.querySelector('.popup__btn_edit');
const btnAddBook = document.querySelector('.add__book');
const btnClosePopup = document.querySelector('.popup-close');
const btnClosePopupInfo = document.querySelector('.popup-close_info');
const overlay = document.querySelector('.overlay');
const btnClean = document.querySelector('.popup__btn_clean');
const inputs = document.querySelectorAll('input');
const listBooks = document.querySelector('.list__books');
const myServer = `http://localhost:3004/posts`;
const authorServer = `http://localhost:3004/authors`;
const addBookButton = document.querySelector('.popup__button_add');
const overlayInfo = document.querySelector('.overlay__inform');

/** Get elements from the overlay - add new book */
const inputTitle = document.querySelector('#book__name');
const inputAuthor = document.querySelector('#book__author');
const inputPages = document.querySelector('#book__pages');
const inputQuality = document.querySelector('#book__quality');
const inputLanguage = document.querySelector('#book__language');
const inputYear = document.querySelector('#book__year');
const inputImg = document.querySelector('#book__img');
const inputDescr = document.querySelector('#book__descr');

console.log(inputTitle);

/** function - create element */

let createElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList = className;
  return element;
};

/** OVERLAY */
/** Show overlay */

btnAddBook.addEventListener('click', () => {
  overlay.classList.add('show');
  inputs.forEach(input => input.value = '');
  addBookButton.disabled = false;
  addBookButton.style.backgroundColor = 'red';
});

/** Close overlay */

let closeOverlay = () => {
  /**  close by clicking on close button */
  btnClosePopup.addEventListener('click', () => {
    overlay.classList.remove('show');
  }); 

  /** Close overlay clicking on another place of the window */
  window.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('show');
    };
  });
};
closeOverlay();

/** OVERLAY INFO */

/** Show overlay-info */
let showOverlayInfo = () => {
  addBookButton.addEventListener('click', () => {
    // overlay.classList.remove('show');
    // overlayInfo.classList.add('show');
  });
};
showOverlayInfo();

let closeOverlayInfo = () => {
  /**  close by clicking on close button */
  btnClosePopupInfo.onclick = function () {
    overlayInfo.classList.remove('show');
  };

  /** Close overlay clicking on another place of the window */
  window.addEventListener('click', (e) => {
    if (e.target === overlayInfo) {
      overlayInfo.classList.remove('show');
    }
  });
};
closeOverlayInfo();

/** Edit text in popup's inputs */

btnClean.addEventListener('click', () => {
  inputs.forEach(input => input.value = '');
});

/** Get data from myServer */

let loadBooks = () => {
    listBooks.innerHTML = '';
    fetch(myServer)
        .then(function (responce) {
            return responce.json();
        })
        .then(function (serverBooks) {
          serverBooks.reverse().forEach(bookItem => {
            const liWrapper = createElement('li', 'book__item');
            liWrapper.innerHTML = bookTemplate;

          /** find all selectors  */
            let deleteButton = liWrapper.querySelector('.btn__delete');
            let changeButton = liWrapper.querySelector('.btn__change');
  
            let titleBook = liWrapper.querySelector('.title__book');
            let author = liWrapper.querySelector('.book__author');
            let pages = liWrapper.querySelector('.book__pages');
            let quality = liWrapper.querySelector('.book__quality');
            let bookLanguage = liWrapper.querySelector('.book__language');
            let yearOfProduction = liWrapper.querySelector('.publishing__date');
            let descriptionName = liWrapper.querySelector('.description__name');
            let descriptionText = liWrapper.querySelector('.description__text');
            let imgBook = liWrapper.querySelector('.book__img');
                 
            /** paste data from server into html */
            titleBook.innerHTML = `<b>Название:</b> ${bookItem.title}`;
            author.innerHTML = `<b>Автор:</b> ${bookItem.author}`;
            pages.innerHTML = `<b>Страниц:</b> ${bookItem.pages}`;
            quality.innerHTML = `<b>Качество:</b> ${bookItem.quality}`;
            bookLanguage.innerHTML = `<b>Язык:</b> ${bookItem.language}`;
            yearOfProduction.inner = `<b>Год издания:</b> ${bookItem}`;
            descriptionName.innerHTML = `<b>Описание:</b>`;
            descriptionText.innerHTML = `${bookItem.description}`;
            imgBook.setAttribute('src', bookItem.imgBook);  
            
          /** append template to outer html-block */
            listBooks.appendChild(liWrapper);

            let path = `${myServer}/${bookItem.id}`;

          /** delete book */
            
            deleteButton.addEventListener('click', () => {
              deleteBook(path);
            });

          /** change book */
            
            changeButton.addEventListener('click', (e) => {
                overlay.classList.add('show');
              if (e.target === changeButton) {
                addBookButton.disabled = true;
                addBookButton.style.backgroundColor = 'grey';
              };
              changeBook(bookItem);
            });
          });
        });
};
loadBooks();

/** DELETE BOOK */

let deleteBook = (path) => {
  fetch(path, {
    method: 'DELETE'
  })
    .then(loadBooks);
};

/** ADD BOOK */

let addBook = () => {
  let add = {
    imgBook: inputImg.value,
    title: inputTitle.value,
    author: inputAuthor.value,
    pages: inputPages.value,
    quality: inputQuality.value,
    language: inputLanguage.value,
    yearOfProduction: inputYear.value,
    description: inputDescr.value,
  };
  fetch(myServer, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(add),
  })
    .then(loadBooks);
};
addBookButton.addEventListener('click', addBook);
addBookButton.addEventListener('click', showOverlayInfo);

/** CHANGE BOOK */
 btnClean.addEventListener('click', () => {
  overlay.classList.add('show');
 });

let changeBook = (bookItem) => {

  inputTitle.value = bookItem.title;
  inputAuthor.value = bookItem.author;
  inputPages.value = bookItem.pages;
  inputQuality.value = bookItem.quality;
  inputLanguage.value = bookItem.language;
  inputYear.value = bookItem.yearOfProduction;
  inputImg.value = bookItem.imgBook;
  inputDescr.value = bookItem.description;

};

btnEditOverlay.addEventListener('click', () => {
  addBook();
  overlay.classList.remove('show');
});

/** VALIDATION */

const inputOverlay = document.querySelectorAll('.popup__input');
console.log(inputOverlay);

addBookButton.addEventListener('click', (e) => {
  inputOverlay.forEach(element => {
    clearError(element);
    if (element.value === '') {
      element.classList.add('err');
      const error = '<p class="error__text">Введите корректное знаечение</p>';
      element.insertAdjacentHTML('afterend', error);
    };
  });
});

let clearError = (element) => {
  element.classList.remove('err');
  // const errorText = document.querySelector('.error__text');
  // errorText.closest('.popup__item').removeChild(errorText);
  // const parentLi = document.querySelector('.popup__item');
  // console.log(parentLi.lastChild);
  // parentLi.remove.lastChild;
};

/** SELECT */

let loadAuthors = () => {
  const authorSelect = document.querySelectorAll('.author__select-item');
  fetch(authorServer)
    .then(function (response) {
      return response.json();
    })
    .then(function (authorData) {
      authorData.forEach(authorItem => {
        console.log('authorItem', authorItem.authSelect);
        // authorSelect.value.innerHTML = authorItem.authSelect;
        for (let i = 0; i < authorSelect.length; i++) {
          console.log('authorSelect.value', authorSelect.value);
          authorSelect.value = authorItem.authSelect;
        };
      });
    });
};

loadAuthors();






