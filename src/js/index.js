'use strict';
window.onload = function () {

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
const columnsSettings = [{ 
        containerMinWidth: 0,
        containerMaxWidth: 500,
        columns: 2
    },
    {
        containerMinWidth: 500,
        containerMaxWidth: 1000,
        columns: 3
    },
    {
        containerMinWidth: 1000,
        containerMaxWidth: Infinity,
        columns: 4
    }
];

const filter = new Filter('.products__container', {
    categories,
    columns,
    columnsSettings
});

const hamburgerBtn = document.querySelector('.nav__hamburger-btn');
const list = document.querySelector('.nav__items');
const navigation = new Navigation(hamburgerBtn, list);
}