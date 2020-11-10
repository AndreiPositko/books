import { bookTemplate } from './bookTemplate';
import { ROUTE } from '../../constants/constans';

/** URL */

const urlCopmBooks = "http://localhost:3004/computers";
const urlScienceBooks = "http://localhost:3004/nauka";
const urlAllBooks = "http://localhost:3004/allBooks";
const myServer = `http://localhost:3004/books`;
const authorServer = `http://localhost:3004/authors`;
const categoryServer = `http://localhost:3004/categories`;

/** Get elements from the DOM */
const btnEditOverlay = document.querySelector('.popup__btn_edit');
const btnAddBook = document.querySelector('.add__book');
const btnClosePopup = document.querySelector('.popup-close');
const btnClosePopupInfo = document.querySelector('.popup-close_info');
const overlay = document.querySelector('.overlay');
const btnClean = document.querySelector('.popup__btn_clean');
const inputs = document.querySelectorAll('input');
const listBooks = document.querySelector('.list__books');
const addBookButton = document.querySelector('.popup__button_add');
const overlayInfo = document.querySelector('.overlay__inform');
const authorSelect = document.getElementById('book__author');
const categorySelect = document.getElementById('book__categ');

/** Get elements from the overlay - add new book */
const inputTitle = document.querySelector('#book__name');
const inputAuthor = document.querySelector('#book__author');
const inputPages = document.querySelector('#book__pages');
const inputQuality = document.querySelector('#book__quality');
const inputLanguage = document.querySelector('#book__language');
const inputYear = document.querySelector('#book__year');
const inputImg = document.querySelector('#book__img');
const inputDescr = document.querySelector('#book__descr');



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

/** Get author by ID */

// const getAuthorById = (id) => {
//   return fetch(authorServer)
//     .then(responce => responce.json())
//     .then(authorList => authorList.find(author => author.id === id).name);
// };

const getAuthorById = async (id) => {
  const authorIdPromise = await fetch(authorServer);
  const json = await authorIdPromise.json();
  const responseAuthor = json.find(author => author.id === id).name;
  console.log('responseAuthor', responseAuthor);
  return responseAuthor;
};

getAuthorById(2);


/** Get data from myServer */

const loadBooks = (categoryId) => {
  listBooks.innerHTML = '';
  fetch(urlAllBooks)
    .then(responce => responce.json())
    .then(booksData => {
      if (!!categoryId) {
        return booksData.filter(book => book.categoryID === categoryId);
      } 
      return booksData;
    })
    .then(serverBooks => {
          serverBooks.reverse().forEach( async bookItem => {
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
            let categoryBook = liWrapper.querySelector('.book__category');
            let descriptionName = liWrapper.querySelector('.description__name');
            let descriptionText = liWrapper.querySelector('.description__text');
            let imgBook = liWrapper.querySelector('.book__img');
                 
            /** paste data from server into html */
            titleBook.innerHTML = `<b>Название:</b> ${bookItem.title}`;

            author.innerHTML = `<b>Автор:</b> ${await getAuthorById(bookItem.authorID)}`;
            pages.innerHTML = `<b>Страниц:</b> ${bookItem.pages}`;
            quality.innerHTML = `<b>Качество:</b> ${bookItem.quality}`;
            bookLanguage.innerHTML = `<b>Язык:</b> ${bookItem.language}`;
            yearOfProduction.innerHTML = `<b>Год издания:</b> ${bookItem.yearOfProduction}`;
            categoryBook.innerHTML = `<b>Категория:</b> ${bookItem.categoryID}`;
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

            btnEditOverlay.addEventListener('click', () => {
              sendChangeToServer(path);
              overlay.classList.remove('show');
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

/** SHOW AUTHOR SELECT */

const loadAuthorSelect = () => {
  fetch(authorServer)
    .then(responce => responce.json())
    .then(authorData => {
      authorData.forEach(author => {
        const authorOption = document.createElement('option');
        authorOption.className = 'author__option';
        authorOption.value = author.id;
        authorOption.innerText = author.name;
        authorSelect.appendChild(authorOption);
      });
      });
};
loadAuthorSelect();


/** SHOW CATEGORIES SELECT */

const loadCategoriesSelect = () => {
  fetch(categoryServer)
    .then(responce => responce.json())
    .then(categoryData => {
      categoryData.forEach(category => {
        const categoryOption = document.createElement('option');
        categoryOption.className = 'category__option';
        categoryOption.value = category.id;
        categoryOption.innerText = category.title;
        categorySelect.appendChild(categoryOption);
      });
      });
};
loadCategoriesSelect();

/** ADD BOOK */

const addBook = () => {

  const newBookData = {
    categoryID: Number(categorySelect.value),
    imgBook: inputImg.value,
    title: inputTitle.value,
    authorID: Number(authorSelect.value),
    pages: inputPages.value,
    quality: inputQuality.value,
    language: inputLanguage.value,
    yearOfProduction: inputYear.value,
    description: inputDescr.value,
  };

  console.log('------', newBookData);
  // if (location.pathname === '/comp') {
  //   urlAddBook = 'http://localhost:3004/computers';
  // }

  fetch(urlAllBooks, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(newBookData),
  })
    .then(loadBooks());
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

let sendChangeToServer = (path) => {
  let addChange = {
    imgBook: inputImg.value,
    title: inputTitle.value,
    author: inputAuthor.value,
    pages: inputPages.value,
    quality: inputQuality.value,
    language: inputLanguage.value,
    yearOfProduction: inputYear.value,
    description: inputDescr.value,
  };
  fetch(path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(addChange),
  })
    .then(loadBooks);
};

/** VALIDATION */

const inputOverlay = document.querySelectorAll('.popup__input');

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

/** History API start*/

 const renderPage = (href) => {
    if (href === ROUTE.HOME) {
      loadBooks();
    };
    if (href === ROUTE.COMPUTERS) {
       loadBooks(2);
    }
     if (href === ROUTE.NAUKA) {
       loadBooks(1);
    }
 };

const link = document.querySelectorAll('a');
    link.forEach((element) => {
    element.addEventListener('click', (element) => {
      element.preventDefault();
      const href = element.target.getAttribute('href');
      history.pushState(null, '', href);
      renderPage(href);
    });
  });

window.addEventListener('popstate', () => renderPage(location.pathname));

document.addEventListener('DOMContentLoaded', () => {
  renderPage(location.pathname);
});

/** GET AUTHORS */

let authorsArr = [];

const getAuthors = () => {
  fetch(authorServer)
    .then((responce) => responce.json())
    .then((dataAuthors) => {
      authorsArr = dataAuthors;
    });
};
getAuthors();


/** History API end*/

/** SELECT CATEGORY START */

// let loadCategories = () => {
//   fetch(categoryServer)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (categoryData) {
//       const selectCategory = document.querySelector('#book__categ');
//         categoryData.forEach(categoryItem => {
//         const pathCategoryId = categoryItem.category;
//         const optionCategory = document.createElement('option', 'category__select');
//         selectCategory.appendChild(optionCategory);
//         optionCategory.innerText = pathCategoryId;
//       });
//     });
// };
// loadCategories();

/** SELECT CATEGORY END */

/** History API - 2 start*/
// const renderPage2 = (href2) => {
//     if (href2 === ROUTE.COMPUTERS) {
//       getCompBooks2();
//     }
// };
// const getCompBooks2 = () => {
//   fetch(urlAllBooks)
//     .then(function (response) {
//       return response.json();
//     })
//     .then((allBooksData) => {
//       allBooksData.forEach((book) => {
//       });
//     });
//     loadBooks(urlAllBooks);
// };
// getCompBooks2();
// const getScienceBooks2 = () => {
//   loadBooks2(urlScienceBooks);
// };
// const getAllBooks2 = () => {
//   loadBooks2(urlAllBooks);
// };
// const link2 = document.querySelectorAll('a');
//     link2.forEach((element) => {
//     element.addEventListener('click', (element) => {
//         element.preventDefault();
//         const href2 = element.target.getAttribute('href');
//         history.pushState(null, '', href2);
//         renderPage2(href2);
//     });
// });
// window.addEventListener('popstate', () => renderPage2(location.pathname));
// document.addEventListener('DOMContentLoaded', () => {
//     renderPage2(location.pathname);
// });
/** History API - 2 end*/





