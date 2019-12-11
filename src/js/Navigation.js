'use strict';
class Navigation {
    constructor(button, list) {
        this.button = button;
        this.list = list;

        this.button.addEventListener('click', ()=>{
            this.toggleNav();
        }, false);

        this.setNavigation();

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
    }

    toggleNav = () => {
        this.button.classList.toggle('nav__hamburger-btn--is-active');
        this.list.classList.toggle('nav__items--is-opened');
    }

    setNavigation = () => {
        const items = document.querySelectorAll('.nav__link');
    
        for(let i=0; i<items.length; i++) {
            items[i].addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleNav();
                let scrollTo = document.querySelector(items[i].getAttribute('href')).offsetTop-document.querySelector('.nav__description-container').offsetHeight
                window.scrollTo(0, scrollTo);
            }, false);
        }
    }
}