import { store } from '../store/index';

const popup = document.querySelector('.popup');
export const overlay = document.querySelector('.overlay');

const clearError = () => {
  document.querySelectorAll('.popup .error__text').forEach((errorNode) => {
    errorNode.innerText = '';
    errorNode.style.display = 'none';
  });
};

const clearLastValue = () => {
  const inputsWithValues = [
    document.querySelector('#book__categ'),
    document.querySelector('#book__img'),
    document.querySelector('#book__name'),
    document.querySelector('#book__author'),
    document.querySelector('#book__pages'),
    document.querySelector('#book__quality'),
    document.querySelector('#book__language'),
    document.querySelector('#book__year'),
    document.querySelector('#book__descr'),
  ];
  inputsWithValues.forEach((input) => (input.value = ''));
};

export const closeModal = () => {
  overlay.classList.remove('show');
  popup.classList.remove('show');
  clearError();
  clearLastValue();
};

export const createBook = async () => {
  overlay.classList.add('show');
  popup.classList.add('show');
  const { authors, categories } = store;
  const authSelect = document.querySelector('#book__author');
  const categorySelect = document.querySelector('#book__categ');

  authors.forEach((author) => {
    const option = document.createElement('option');
    option.setAttribute('value', author.id);
    option.innerText = author.name;
    authSelect.appendChild(option);
  });
  categories.forEach((category) => {
    const option = document.createElement('option');
    option.setAttribute('value', category.id);
    option.innerText = category.name;
    categorySelect.appendChild(option);
  });
};
