export const isValid = () => {
  const MIN_LENGTH = 20;
  const isRequired = [
    document.querySelector('#book__name'),
    document.querySelector('#book__author'),
    document.querySelector('#book__img'),
    document.querySelector('#book__categ'),
    document.querySelector('#book__descr'),
  ];
  document.querySelectorAll('.popup .error__text').forEach((errorNode) => {
    errorNode.innerText = '';
    errorNode.style.display = 'none';
  });
  isRequired.forEach((input) => {
    if (!input.value) {
      const errorNode = input.parentNode.querySelector('.error__text');
      errorNode.innerText = 'This field is required!';
      errorNode.style.display = 'block';
    }
  });
  const descrText = document.querySelector('#book__descr');
  console.log(descrText);
  if (descrText.value.length < MIN_LENGTH) {
    const errorNode = document.querySelector('#book__descr').parentNode.querySelector('.error__text');
    errorNode.innerText = `Min length is ${MIN_LENGTH}`;
    errorNode.style.display = 'block';
  }
  return isRequired.every((node) => node.value);
};

const modalInputs = [
  document.querySelector('#book__name'),
  document.querySelector('#book__author'),
  document.querySelector('#book__img'),
  document.querySelector('#book__categ'),
  document.querySelector('#book__descr'),
  document.querySelector('#book__pages'),
  document.querySelector('#book__quality'),
  document.querySelector('#book__language'),
  document.querySelector('#book__year'),
];

modalInputs.forEach((input) => input.addEventListener('blur', e => {
  isValid();
}));

document.querySelector('#book__descr').addEventListener('keyup', e => {
  document.querySelector('label.textarea > b').innerText = e.target.value.length;
});