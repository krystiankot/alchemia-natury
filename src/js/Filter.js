'use strict';
class Filter {
    constructor(filterSelector, options) {
        this.filteredElement = document.querySelector(filterSelector);
        this.options = options;
        this.elements = this.filteredElement.children;
        this.filteredElements = [];
        window.addEventListener('resize', this.sortAll, false);
    }

    generateTags = () => {
        const tagsContainer = document.createElement('ul');
        tagsContainer.classList.add('filter');
        for (let i = 0; i < this.options.categories.length; i++) {
            let item = document.createElement('li');
            item.innerText = this.options.categories[i].name;
            item.setAttribute('data-category', this.options.categories[i].name);
            item.classList.add('filter__item');
            item.addEventListener('click', () => {
                this.filter(item);
            }, false);
            tagsContainer.appendChild(item);
        }
        this.filteredElement.parentNode.insertBefore(tagsContainer, this.filteredElement);
        this.filter(tagsContainer.children[0]);
    }
    filter = (item) => {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].removeAttribute('filtered');
        }
        if (item.getAttribute('data-category') !== 'Wszystkie') {
            for (let i = 0; i < this.elements.length; i++) {
                if (this.elements[i].getAttribute('data-category') === item.getAttribute('data-category')) {
                    this.elements[i].setAttribute('filtered', 'true');
                }
            }
        } else {
            for (let i = 0; i < this.elements.length; i++) {
                this.elements[i].setAttribute('filtered', 'true');
            }
        }
        this.sortAll();
    }
    sortAll = () => {
        if (window.innerWidth < 400) {
            this.options.columns = 2;
        } else if (window.innerWidth > 400 && window.innerWidth < 1000) {
            this.options.columns = 3;
        } else if (window.innerWidth > 1000) {
            this.options.columns = 4;
        }
        let margin = 5;
        let columns = [];
        const findShortestColumn = (columns) => {
            return columns.indexOf(Math.min(...columns));
        }
        const findLongestColumn = (columns) => {
            return columns.indexOf(Math.max(...columns));
        }
        for (let i = 0; i < this.options.columns; i++) {
            columns.push(0);
        }
        let width = (100 - (this.options.columns - 1) * margin) / this.options.columns
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].hasAttribute('filtered')) {
                let column = findShortestColumn(columns);
                let height = columns[column];
                let left = column * (100 / this.options.columns + margin / this.options.columns);
                // `calc(${height}px)`;
                this.elements[i].style.top = height + 'px';
                this.elements[i].style.left = left + '%';
                this.elements[i].style.transform = 'scale(1)';
                this.elements[i].style.opacity = 1;
                this.elements[i].style.width = width + '%';
                columns[column] += this.elements[i].offsetHeight;
                columns[column] += 0.05 * this.filteredElement.offsetWidth;
            } else {
                this.elements[i].style.transform = 'scale(0)';
                this.elements[i].style.opacity = 0;
                this.elements[i].style.width = width + '%';
            }
        }
        this.filteredElement.style.height = columns[findLongestColumn(columns)] + 'px';
    }
}