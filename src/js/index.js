const hamburger = document.querySelector('.nav__hamburger-btn');
const lista = document.querySelector('.nav__items');
var flag = true;
hamburger.addEventListener('click', function () {
    this.classList.toggle('nav__hamburger-btn--is-active');
    if (flag) {
        flag = false;
        lista.classList.add('nav__items--is-opened');
    } else {
        lista.classList.remove('nav__items--is-opened');
        flag = true;
    }

});

window.addEventListener('scroll', function () {
    let pageYOffset = this.pageYOffset;
    let navHeight = document.querySelector('.nav__description-container').offsetHeight;
    let nav = document.querySelector('.nav');
    switch (true) {
        case pageYOffset < navHeight: {
            nav.classList.remove('nav--is-fixed');
            break;
        }
        case pageYOffset > navHeight: {
            nav.classList.add('nav--is-fixed');
            break;
        }
        default: {};
    }
}, false);

const slider = new Slider('.header__slider', {});
const contactForm = new ContactForm('.section__form-container', {});



const categories = [{
        id: 'wszystkie',
        name: 'Wszystkie'
    },
    {
        id: 'maseczki',
        name: 'Maseczki enzymatyczne'
    },
    {
        id: 'bomby',
        name: 'Nawilżające bomby kąpielowe'
    },
    {
        id: 'mydła',
        name: 'Mydła'
    },
    {
        id: 'sole',
        name: 'Aromapeutyczne sole do kąpieli'
    }
];
const columns = 3;
const filter = new Filter('.products__container', {
    categories,
    columns
});

filter.generateTags();