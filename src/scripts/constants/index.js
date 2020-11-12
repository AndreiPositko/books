const BASE = 'http://localhost:3004';

export const urls = {
	booksNauka: { id: 1, href: '/nauka' },
	booksComp: { id: 2, href: '/comp' },
	home: { id: 3, href: '/' },
};

export const api = {
	books: {
		getBook: async (id) => {
			try {
				const book = await fetch(`${BASE}/allBooks/${id}`).then((res) => res.json());
				return book;
			} catch (error) {
				console.warn(error);
			}
		},
		getBooks: async () => {
			try {
				const books = await fetch(`${BASE}/allBooks`).then((res) => res.json());
				return books;
			} catch (error) {
				console.warn(error);
			}
		},
		deleteBook: async (id) => {
			try {
				const deletedBook = await fetch(`${BASE}/allBooks/${id}`).then((res) => res.json());
				return deletedBook;
			} catch (error) {
				console.warn(error);
			}
		},
		createBook: () => {},
		editBook: () => {},
	},
	authors: {
		getAuthors: async () => {
			try {
				const authors = await fetch(`${BASE}/authors`).then((res) => res.json());
				return authors;
			} catch (error) {
				console.warn(error);
			}
		},
	},
	categories: {
		getCategories: async () => {
			try {
				const categories = await fetch(`${BASE}/categories`).then((res) => res.json());
				return categories;
			} catch (error) {
				console.warn(error);
			}
		},
	},
};
