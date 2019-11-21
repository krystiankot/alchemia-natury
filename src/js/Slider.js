'use strict';
class Slider {
    constructor(sliderSelector, options) {
        this.slider = document.querySelector(sliderSelector);
        this.options = options;
        this.currentSlide = 0;
        this.previousSlide = 0;
        this.slides = null;
        this.prev = null;
        this.next = null;
        this.dots = [];

        this.generateSlider();
    }

    generateSlider = () => {
        this.slider.classList.add('slider');
        const sliderContainer = document.createElement('div');
        sliderContainer.classList.add('slider__container');

        this.slides = this.slider.children;
        while (this.slides.length) {
            this.slides[0].classList.add('slider__slide');
            sliderContainer.append(this.slides[0]);
        }

        this.slider.appendChild(sliderContainer);
        this.slides = document.querySelectorAll('.slider__slide');

        this.createPrevNext();
        this.createDots();
        this.changeSlide(0);
    }

    createPrevNext = () => {
        this.prev = document.createElement('button');
        this.prev.classList.add('slider__button');
        this.prev.classList.add('slider__button--prev');
        this.prev.type = 'button';
        this.prev.addEventListener('click', this.slidePrev, false);

        this.next = document.createElement('button');
        this.next.classList.add('slider__button');
        this.next.classList.add('slider__button--next');
        this.next.type = 'button';
        this.next.addEventListener('click', this.slideNext, false);

        const nav = document.createElement('div');
        nav.classList.add('slider__nav');
        nav.appendChild(this.prev);
        nav.appendChild(this.next);
        this.slider.appendChild(nav);
    }

    createDots = () => {
        const dotsContainer = document.createElement('ul');
        dotsContainer.classList.add('slider__dots');

        for (let i = 0; i < this.slides.length; i++) {
            const li = document.createElement('li');
            li.classList.add('slider__dots-element');

            const button = document.createElement('button');
            button.classList.add('slider__dots-button');
            button.type = 'button';

            button.addEventListener('click', () => {
                this.changeSlide(i);
            }, false);

            li.appendChild(button);
            dotsContainer.appendChild(li);
            this.dots.push(li);
        }
        this.slider.appendChild(dotsContainer);
    }

    changeSlide = (index) => {
        this.currentSlide = index;

        this.slides.forEach((slide) => {
            slide.classList = ['slider__slide'];
        });

        this.slides[this.currentSlide].classList.add('slider__slide--moved-center');

        this.slides.forEach((slide, index) => {
            if (index < this.currentSlide) {
                if (this.currentSlide == this.slides.length - 1 && index == 0) slide.classList.add('slider__slide--moved-right');
                else slide.classList.add('slider__slide--moved-left');
            } else if (index > this.currentSlide) {
                if (this.currentSlide == 0 && index == this.slides.length - 1) slide.classList.add('slider__slide--moved-left');
                else slide.classList.add('slider__slide--moved-right');
            } else slide.classList.add('slider__slide--moved-center');
        });

        this.dots.forEach((dot) => {
            dot.firstChild.classList.remove('slider__dots-button--is-active');
        });

        this.dots[index].firstChild.classList.add('slider__dots-button--is-active');
    }

    slidePrev = () => {
        this.currentSlide--;
        if (this.currentSlide < 0) {
            this.currentSlide = this.slides.length - 1;
        }
        this.changeSlide(this.currentSlide);
    }

    slideNext = () => {
        this.currentSlide++;
        if (this.currentSlide > this.slides.length - 1) {
            this.currentSlide = 0;
        }
        this.changeSlide(this.currentSlide);
    }
}