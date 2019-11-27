const hamburger = document.querySelector('.nav__hamburger-btn');
const lista = document.querySelector('.nav__items');
var flag = true;
hamburger.addEventListener('click', function () {
    this.classList.toggle('nav__hamburger-btn--is-active');
    const height = lista.children[0].offsetHeight * lista.children.length;

    if (flag) {
        flag = false;
        lista.style.height = height + 'px';
    } else {
        lista.style.height = 0 + 'px';
        flag = true;
    }

})

const slider = new Slider('.header__slider', {});
const filter = new Filter('.products__container', {});

filter.generateTags();

const contactForm = new ContactForm('.section__form-container', {});