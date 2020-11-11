import { authorApi, categoryApi, booksApi } from '../constants';
import fetchJson from '../utils/fetchJson';

export let authorsArr = [];
export let categoriesArr = [];
export let booksArr = [];

export const getAuthors = async () => {
    authorsArr = await fetchJson(authorApi);
    // return authors;
};

export const getCategories = async () => {
    categoriesArr = await fetchJson(categoryApi);
    // return categories;
};

export const getBooks = async () => {
    booksArr = await fetchJson(booksApi);
    // return books;
};

export const initCommonInfo = () => {
    return Promise.all([
        getAuthors(),
        getCategories(),
        getBooks()
    ]);
};



