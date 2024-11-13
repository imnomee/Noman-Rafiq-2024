const addEventOnElements = (elements, eventType, callback) => {
    console.log(elements);
    for (let i = 0; i < elements.lenth; i++) {
        elements[i].addEventListener(eventType, callback);
    }
};

const loadingElement = document.querySelector('[data-loading]');
window.addEventListener('load', () => {
    loadingElement.classList.add('loaded');
    document.body.classList.remove('active');
});

// mobile nav toggle
const navTogglers = document.querySelectorAll('[data-nav-toggler]');
const navLinks = document.querySelectorAll('.navbar-item');
const navbar = document.querySelector('[data-navbar]');
const overlay = document.querySelector('[data-overlay]');

navTogglers.forEach((toggler) => {
    toggler.addEventListener('click', () => {
        console.log('clicked');
        navbar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('active');
    });
});
