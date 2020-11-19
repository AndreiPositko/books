import { urls } from '../api/index';
import { store } from '../store';

export const filterBooks = (books, url) => {
  if (url === urls.home.href) {
    return books;
  }
  if (url === urls.booksComp.href) {
    return books.filter(book => book.categoryID === urls.booksComp.id);
  }
  if (url === urls.booksNauka.href) {
    return books.filter(book => book.categoryID === urls.booksNauka.id);
  }
  const pathArr = url.split('/');
  if (pathArr.length > 2) {
    const id = pathArr[pathArr.length - 1];
    return store.books.find((book) => book.id === +id);
  }
  return null;
};