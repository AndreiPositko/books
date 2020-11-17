import { store } from '../store/index';

(() => {
    const inputSearch = document.querySelector('.header__input');

    inputSearch.addEventListener('input', (e) => {
        const { value } = e.target;
        const filteredBooks = store.books.filter(book => book.title.includes(value));
        renderBook(location.pathname, filteredBooks);
    });
})();
