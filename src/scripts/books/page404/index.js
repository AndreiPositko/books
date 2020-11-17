export const removeTitle404 = () => {
  const h1 = document.querySelector('.page404');
  if (h1) {
    h1.remove();
  }
};

export const renderPageNoFound = () => {
  const wrapper = document.querySelector('.main__block');
  const h1 = document.createElement('h1');
  h1.classList.add('page404');
  h1.innerText = 'Page Not Found';
  wrapper.appendChild(h1);
};