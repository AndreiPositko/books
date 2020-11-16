const BASE = `http://localhost:3004`;

export const urls = {
    booksNauka: { id: 1, href: '/nauka' },
    booksComp: { id: 2, href: '/comp' },
    home: { id: 3, href: '/' },
};

export const api = {
    books: {
        getBook: async (id) => {
            try {
                const book = await fetch(`${BASE}/books/${id}`).then((result) => result.json());
                return book;
            } catch (error) {
                console.warn(error);
            }
        },
        getBooks: async () => {
            try {
                const books = await fetch(`${BASE}/books`).then((result) => result.json());
                return books;
            } catch (error) {
                console.warn(error);
            }
        },
        deleteBook: async (id) => {
            try {
                const deletedBook = await fetch(`${BASE}/books/${id}`, {
                    method: 'DELETE'
                })
                .then((result) => result.json());
                return deletedBook;
            } catch (error) {
                console.warn(error);
            }
        }
    },
    authors: {
        getAuthors: async () => {
            try {
                const authors = await fetch(`${BASE}/authors`).then((result) => result.json());
                return authors;
            } catch (error) {
                console.log(error);
            }
        }
    },
    categories: {
        getCategories: async () => {
            try {
                const categories = await fetch(`${BASE}/categories`).then((result) => result.json());
                return categories;
            } catch (error) {
                console.log(error);
            }
        }
    },
};