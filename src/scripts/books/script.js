import { bookTemplate } from './bookTemplate';
import { ROUTE, booksApi, authorApi, categoryApi } from '../constants';
import { getAuthorById, getCategoryById } from './findItemsById/getItemsById';
import { initCommonInfo, getBooks, getAuthors, getCategories } from '../common/index';
import { authorsArr, categoriesArr, booksArr } from '../common/index';

initCommonInfo()
  .then(() => renderBooks(booksArr));

/** Get elements from the DOM */

const btnEditOverlay = document.querySelector('.popup__btn_edit');
const btnAddBook = document.querySelector('.add__book');
const btnClosePopup = document.querySelector('.popup-close');
const btnClosePopupInfo = document.querySelector('.popup-close_info');
const overlay = document.querySelector('.overlay');
const btnClean = document.querySelector('.popup__btn_clean');
const inputs = document.querySelectorAll('.popup__input');
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

const createElementandAddClass = (tagName='div', className='') => {
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

const closeOverlay = () => {
  /**  close by clicking on close button */
  btnClosePopup.addEventListener('click', () => {
    overlay.classList.remove('show');
  }); 

  /** Close overlay clicking on another place of the window */
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('show');
    };
  });
};
closeOverlay();

/** OVERLAY INFO */

/** Show overlay-info */
const showOverlayInfo = () => {
  addBookButton.addEventListener('click', () => {
    overlay.classList.remove('show');
    overlayInfo.classList.add('show');
  });
};
showOverlayInfo();

const closeOverlayInfo = () => {
  /**  close by clicking on close button */
  btnClosePopupInfo.addEventListener( 'click', ()=>
    overlayInfo.classList.remove('show')
  );

  /** Close overlay clicking on another place of the window */
  overlay.addEventListener('click', (e) => {
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

const renderBooks = (dataArr) => {
  listBooks.innerHTML = '';

  dataArr.reverse().forEach(bookItem => {
    const liWrapper = createElementandAddClass('li', 'book__item');
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
    author.innerHTML = `<b>Автор:</b> ${getAuthorById(bookItem.authorID)}`;
    pages.innerHTML = `<b>Страниц:</b> ${bookItem.pages}`;
    quality.innerHTML = `<b>Качество:</b> ${bookItem.quality}`;
    bookLanguage.innerHTML = `<b>Язык:</b> ${bookItem.language}`;
    yearOfProduction.innerHTML = `<b>Год издания:</b> ${bookItem.yearOfProduction}`;
    categoryBook.innerHTML = `<b>Категория:</b> ${getCategoryById(bookItem.categoryID)}`;
    descriptionName.innerHTML = `<b>Описание:</b>`;
    descriptionText.innerHTML = `${bookItem.description}`;
    imgBook.setAttribute('src', bookItem.imgBook);
            
    /** append template to outer html-block */
    listBooks.appendChild(liWrapper);

    let path = `${booksApi}/${bookItem.id}`;

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
      writeValuesToInputs(bookItem);
    });

    btnEditOverlay.addEventListener('click', () => {
      sendChangeToServer(path);
      overlay.classList.remove('show');
    });
  });
};

const renderBooksCategory = (categoryId) => {
  if (!!categoryId) {
    renderBooks(booksArr.filter(book => book.categoryID === categoryId));
  } else {
    renderBooks(booksArr);
  }
};

/** DELETE BOOK */

const deleteBook = (path) => {
  fetch(path, {
    method: 'DELETE'
  })
    .then(loadBooks);
};

/** SHOW AUTHOR SELECT */

const loadAuthorSelect = () => {
  fetch(authorApi)
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
  fetch(categoryApi)
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
    categoryID: +(categorySelect.value),
    imgBook: inputImg.value,
    title: inputTitle.value,
    authorID: +(authorSelect.value),
    pages: inputPages.value,
    quality: inputQuality.value,
    language: inputLanguage.value,
    yearOfProduction: inputYear.value,
    description: inputDescr.value,
  };
  fetch(booksApi, {
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

const writeValuesToInputs = (bookItem) => {

    inputTitle.value = bookItem.title;
    inputAuthor.value = bookItem.author;
    inputPages.value = bookItem.pages;
    inputQuality.value = bookItem.quality;
    inputLanguage.value = bookItem.language;
    inputYear.value = bookItem.yearOfProduction;
    inputImg.value = bookItem.imgBook;
    inputDescr.value = bookItem.description;
};

const sendChangeToServer = (path) => {
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

const clearError = (element) => {
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
      renderBooks(booksArr);
    };
    if (href === ROUTE.COMPUTERS) {
      renderBooksCategory(2);
    }
    if (href === ROUTE.NAUKA) {
      renderBooksCategory(1);
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






