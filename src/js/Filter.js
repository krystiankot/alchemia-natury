'use strict';
class Filter {
    constructor(filterSelector, options) {
        this.filteredElement = document.querySelector(filterSelector);
        this.options = options;
        this.elements = this.filteredElement.children;
    }


    generateTags = () => {
        const tagsContainer = document.createElement('ul');
        tagsContainer.classList.add('filter');

        let item = document.createElement('li');
        item.innerText = 'Wszystkie';
        item.classList.add('filter__item');
        tagsContainer.appendChild(item);
        item.addEventListener('click', () => {
            this.filter(item);
        }, false);

        for (let i = 0; i < this.elements.length; i++) {
            let item = document.createElement('li');
            item.innerText = this.filteredElement.children[i].getAttribute('data-category');
            item.classList.add('filter__item');

            item.addEventListener('click', () => {
                this.filter(item);
            }, false);

            tagsContainer.appendChild(item);
        }
        this.filteredElement.parentNode.insertBefore(tagsContainer, this.filteredElement);
    }

    filter = (item) => {
        console.log(item.innerText);
        if (item.innerText === 'Wszystkie') {
            for (let i = 0; i < this.elements.length; i++) {
                this.elements[i].classList.remove('filter__item--is-hidden');
            }
        } else {
            for (let i = 0; i < this.elements.length; i++) {
                if (this.elements[i].getAttribute('data-category') !== item.innerText) {
                    this.elements[i].classList.add('filter__item--is-hidden');
                } else {
                    this.elements[i].classList.remove('filter__item--is-hidden');

                }
            }
        }

    }


}