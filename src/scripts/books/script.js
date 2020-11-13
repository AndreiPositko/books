import { api, urls } from '../constants';
import { bookTemplate, bookSingleTemplate } from './bookTemplate';

// ! Variables
const listBooksNode = document.querySelector('.list__books');
const overlay = document.querySelector('.overlay');
const popup = document.querySelector('.popup');
const closeBtnNode = document.querySelector('.popup-close');

// ! Data

const store = {
	books: [],
	authors: [],
	categories: [],
};

const getCurrentDataById = (data, id) => {
	const object = data.find((item) => item.id === id);
	if (!object) {
		return '';
	}

	const res = object.title ? object.title : object.name;
	return res;
};

const removeTitle404 = () => {
	const h1 = document.querySelector('h1');
	if (h1) {
		h1.remove();
	}
};

const rederPageNotFound = () => {
	const wrapper = document.querySelector('.main__block');
	const h1 = document.createElement('h1');
	h1.innerText = 'Page Not Found';
	wrapper.appendChild(h1);
};

const filterBooks = (books, url) => {
	if (url === urls.home.href) {
		return books;
	}
	if (url === urls.booksComp.href) {
		return books.filter((book) => book.categoryID === urls.booksComp.id);
	}
	if (url === urls.booksNauka.href) {
		return books.filter((book) => book.categoryID === urls.booksNauka.id);
	}

	const pathArr = url.split('/');

	if (pathArr.length > 2) {
		// ! Page with ID
		const id = pathArr[pathArr.length - 1];
		return store.books.find((book) => book.id === +id);
	}

	return null;
};

const deleteBook = async (id) => {
	await api.books.deleteBook(id);
	const books = await api.books.getBooks();
	store.books = books;
	render(location.pathname, store.books);
};

const removeSingleData = () => {
	const single = document.querySelector('.single');
	if (single) {
		single.remove();
	}
};

function render(currentUrl, booksData) {
	const { authors, categories } = store;
	const books = filterBooks(booksData, currentUrl);

	if (!books) {
		return rederPageNotFound();
	} else {
		removeTitle404();
	}
	listBooksNode.innerHTML = '';

	if (Array.isArray(books)) {
		removeSingleData();
		books.forEach((book) => {
			const {
				quality,
				language,
				title,
				authorID,
				pages,
				yearOfProduction,
				categoryID,
				description,
				imgBook,
				id,
			} = book;

			const bookWrapper = document.createElement('li');
			bookWrapper.innerHTML = bookTemplate;

			bookWrapper.querySelector('.title__book').innerText = title;
			const catId = Object.values(urls).find((obj) => obj.id === categoryID);
			bookWrapper.querySelector('.title__book').setAttribute('href', `${catId.href}/${id}`);

			bookWrapper.querySelector('.book__author').innerHTML = `<b>Автор</b>: ${getCurrentDataById(authors, authorID)}`;

			if (pages) {
				bookWrapper.querySelector('.book__pages').innerHTML = `<b>Страницы</b>:${pages}`;
			}
			if (quality) {
				bookWrapper.querySelector('.book__quality').innerHTML = `<b>Качество</b>:${quality}`;
			}
			if (language) {
				bookWrapper.querySelector('.book__language').innerHTML = `<b>Язык</b>:${language}`;
			}
			if (yearOfProduction) {
				bookWrapper.querySelector('.publishing__date').innerHTML = `<b>Год</b>:${yearOfProduction}`;
			}

			bookWrapper.querySelector('.book__category').innerHTML = `<b>Категория</b>:${getCurrentDataById(
				categories,
				categoryID
			)}`;
			bookWrapper.querySelector('.description__text').innerHTML = `<b>Описание</b>:${description}`;
			bookWrapper.querySelector('.book__img').setAttribute('src', imgBook);
			bookWrapper.querySelector('.book__img').setAttribute('alt', title);

			bookWrapper.querySelector('.btn__delete').addEventListener('click', () => deleteBook(id));

			listBooksNode.appendChild(bookWrapper);
		});
	} else {
		removeSingleData();
		const mainNode = document.querySelector('.main__block');
		const wrapper = document.createElement('div');
		wrapper.classList.add('single');
		wrapper.innerHTML = bookSingleTemplate;
		const { imgBook, title } = books;
		wrapper.querySelector('.title').innerText = title;
		wrapper.querySelector('img').setAttribute('src', imgBook);
		wrapper.querySelector('img').setAttribute('alt', title);
		mainNode.appendChild(wrapper);
	}
	document.querySelectorAll('.main__block a').forEach((link) =>
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const href = e.target.getAttribute('href');
			history.pushState(null, '', href);
			render(href, store.books);
		})
	);
}

const addRouteLogicForLink = () => {
	document.querySelectorAll('a').forEach((link) =>
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const href = e.target.getAttribute('href');
			history.pushState(null, '', href);
			render(href, store.books);
		})
	);
};

document.addEventListener('DOMContentLoaded', async () => {
	const books = await api.books.getBooks();
	const authors = await api.authors.getAuthors();
	const categories = await api.categories.getCategories();
	store.books = books;
	store.authors = authors;
	store.categories = categories;
	render(location.pathname, store.books);

	addRouteLogicForLink();

	window.addEventListener('popstate', () => {
		render(location.pathname, store.books);
		addRouteLogicForLink();
	});
});

const clearError = () => {
	document.querySelectorAll('.popup .error').forEach((errorNode) => {
		errorNode.innerText = '';
		errorNode.style.display = 'none';
	});
};

const cleateLastValue = () => {
	[
		document.querySelector('#book__categ'),
		document.querySelector('#book__author'),
		document.querySelector('#book__img'),
		document.querySelector('#book__name'),
		document.querySelector('#book__pages'),
		document.querySelector('#book__quality'),
		document.querySelector('#book__language'),
		document.querySelector('#book__year'),
		document.querySelector('#book__descr'),
	].forEach((node) => (node.value = ''));
};

const closeModal = () => {
	popup.style.display = 'none';
	overlay.style.display = 'none';
	cleateLastValue();
	clearError();
};

const createBook = async () => {
	popup.style.display = 'block';
	overlay.style.display = 'block';
	const { authors, categories } = store;
	const authSelect = document.querySelector('#book__author');
	const catSelect = document.querySelector('#book__categ');
	authors.forEach((author) => {
		const option = document.createElement('option');
		option.setAttribute('value', author.id);
		option.innerText = author.name;
		authSelect.appendChild(option);
	});
	categories.forEach((category) => {
		const option = document.createElement('option');
		option.setAttribute('value', category.id);
		option.innerText = category.title;
		catSelect.appendChild(option);
	});
};

document.querySelector('.add__book').addEventListener('click', createBook);

overlay.addEventListener('click', closeModal);
closeBtnNode.addEventListener('click', closeModal);

// ! Search
const inputSearch = document.querySelector('.header__input input');
inputSearch.addEventListener('input', (e) => {
	const { value } = e.target;
	const filteredBooks = store.books.filter((book) => book.title.includes(value) || book.description.includes(value));
	render(location.pathname, filteredBooks);
});

// ! Add book

const isValid = () => {
	const MIN_LENGTH = 20;
	const isRequired = [
		document.querySelector('#book__name'),
		document.querySelector('#book__img'),
		document.querySelector('#book__author'),
		document.querySelector('#book__categ'),
		document.querySelector('#book__descr'),
	];
	clearError();
	isRequired.forEach((input) => {
		if (!input.value) {
			const errorNode = input.parentNode.querySelector('.error');
			errorNode.innerText = 'This field is required';
			errorNode.style.display = 'block';
		}
	});

	if (document.querySelector('#book__descr').value.length < MIN_LENGTH) {
		const errorNode = document.querySelector('#book__descr').parentNode.querySelector('.error');
		errorNode.innerText = `Min length is ${MIN_LENGTH}`;
		errorNode.style.display = 'block';
	}

	return isRequired.every((node) => !!node.value);
};

[
	document.querySelector('#book__name'),
	document.querySelector('#book__pages'),
	document.querySelector('#book__quality'),
	document.querySelector('#book__language'),
	document.querySelector('#book__year'),
	document.querySelector('#book__img'),
	document.querySelector('#book__descr'),
].forEach((input) =>
	input.addEventListener('blur', (e) => {
		isValid();
	})
);

document.querySelector('#book__descr').addEventListener('keyup', (e) => {
	document.querySelector('label.textarea > b').innerText = e.target.value.length;
});

document.querySelector('.popup__button_add').addEventListener('click', async () => {
	if (isValid()) {
		const book = {
			categoryID: +document.querySelector('#book__categ').value,
			authorID: +document.querySelector('#book__author').value,
			imgBook: document.querySelector('#book__img').value,
			title: document.querySelector('#book__name').value,
			pages: document.querySelector('#book__pages').value,
			quality: document.querySelector('#book__quality').value,
			language: document.querySelector('#book__language').value,
			yearOfProduction: document.querySelector('#book__year').value,
			description: document.querySelector('#book__descr').value,
		};
		await api.books.createBook(book);
		const books = await api.books.getBooks();
		store.books = books;
		closeModal();
		render(location.pathname, store.books);
	}
});
