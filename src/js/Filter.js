class Filter {
    constructor(filterSelector, options) {
        this.filteredElement = document.querySelector(filterSelector);
        this.options = options;
        this.tags = [];
        this.elements = this.filteredElement.children;
        this.filteredElements = [];
        window.addEventListener('resize', this.sortAll, false);

        this.generateTags();
        this.addEvents();
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
                this.styleTags(item);
            }, false);
            tagsContainer.appendChild(item);
            this.tags.push(item);
        }
        this.tags[0].classList.add('filter__item--is-active');
        this.filteredElement.parentNode.insertBefore(tagsContainer, this.filteredElement);
        this.filter(tagsContainer.children[0]);
    }

    styleTags = (item) => {
        for (let i = 0; i < this.tags.length; i++) {
            if(this.tags[i].getAttribute('data-category')===item.getAttribute('data-category')) {
                this.tags[i].classList.add('filter__item--is-active');
            } else this.tags[i].classList.remove('filter__item--is-active');
        }
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

    setColumnsNumber = () => {
        for(let i=0; i<this.options.columnsSettings.length; i++) {
            if(this.filteredElement.offsetWidth > this.options.columnsSettings[i].containerMinWidth && this.filteredElement.offsetWidth <= this.options.columnsSettings[i].containerMaxWidth) {
                this.options.columns = this.options.columnsSettings[i].columns;
                break;
            }
        }
    }

    sortAll = () => {
        this.setColumnsNumber();
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

    addEvents = () => {
        for(let i=0; i<this.elements.length; i++) {
            this.elements[i].addEventListener('click', () => {
                this.showDetails(this.elements[i]);

                let product = this.elements[i].id;

                const toggleClasses = () => {
                    document.querySelector('#'+product+'-details').classList.remove('products-details__container--opacity');
                    document.querySelector('.products-details__background').classList.remove('products-details__background--opacity');
                    document.body.style.overflow = 'auto';
                }

                document.querySelector('#'+product+'__close-btn').addEventListener('click', toggleClasses, false);
                document.querySelector('.products-details__background').addEventListener('click', toggleClasses, false);
                document.addEventListener('keydown', function(e){
                    if(e.keyCode==27) {
                        toggleClasses();
                    }
                }, false);
            }, false);
        }
    }

    showDetails = (element) => {
        let product = element.id;
        document.querySelector('#'+product+'-details').classList.add('products-details__container--opacity');
        document.querySelector('.products-details__background').classList.add('products-details__background--opacity');
        document.body.style.overflow = 'hidden';  
    }
}