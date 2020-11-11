
const renderPage = (href) => {
    if (href === '/home') {
        h1.innerHTML = 'Home Page';
    }
    if (href === '/page_1') {
        h1.innerHTML = 'Page - 1';
    }
    if (href === '/contacts') {
        h1.innerHTML = 'Contacts Page';
    }
};

const link = document.querySelectorAll('a');
    link.forEach((element) => {
    element.addEventListener('click', (element) => {
        element.preventDefault();
        const href = element.target.getAttribute('href');
        console.log(href);
        history.pushState(null, '', href);
        renderPage(href);
    });
});

window.addEventListener('popstate', () => renderPage(location.pathname));

document.addEventListener('DOMContentLoaded', () => {
    renderPage(location.pathname);
});