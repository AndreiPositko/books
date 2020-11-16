const popup = document.querySelector('.popup');
export const overlay = document.querySelector('.overlay');

export const closeModal = () => {
  overlay.classList.remove('show');
  popup.classList.remove('show');
};

export const createBook = async () => {
  overlay.classList.add('show');
  popup.classList.add('show');
  const authors = await api.authors.getAuthors();
  const categories = await api.categories.getCategories();
  
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
