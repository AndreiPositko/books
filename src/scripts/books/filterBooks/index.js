import { urls } from '../api/index';

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
  return null;
};