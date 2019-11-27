class ContactForm {
    constructor(formContainerSelector, options) {
        this.formContainer = document.querySelector(formContainerSelector);
        this.options = options;
        this.inputs = [];
        this.form = this.generateForm();
    }

    generateForm = () => {
        const form = document.createElement('form');
        form.classList.add('form');

        for (let i = 0; i < 4; i++) {
            let inputContainer = document.createElement('div');
            inputContainer.classList.add('form__input-container');
            let input = document.createElement('input');
            input.classList.add('form__input');
            input.autocomplete = 'off';
            let label = document.createElement('label');
            label.classList.add('form__input-label');
            let alert = document.createElement('span');
            alert.classList.add('form__input-alert');
            alert.classList.add('icon-attention-alt');

            switch (i) {
                case 0: {
                    input.type = "text";
                    input.name = "name";
                    label.setAttribute('for', 'name');
                    label.innerHTML = 'Nazwa';
                    alert.innerText = 'Nazwa nie może być pusta';
                    input.addEventListener('focusout', () => {
                        this.validateInput(input, alert);
                    }, false);
                    break;
                }
                case 1: {
                    input.type = "email";
                    input.name = "email";
                    label.setAttribute('for', 'email');
                    label.innerHTML = 'Adres email';
                    alert.innerText = 'Email jest nieprawidłowy';
                    input.addEventListener('focusout', () => {
                        this.validateInput(input, alert);
                    }, false);
                    break;
                }
                case 2: {
                    input.type = "text";
                    input.name = "subject";
                    label.setAttribute('for', 'subject');
                    label.innerHTML = 'Temat';
                    alert.innerText = 'Temat nie może być pusty';
                    input.addEventListener('focusout', () => {
                        this.validateInput(input, alert);
                    }, false);
                    break;
                }
                case 3: {
                    input = document.createElement('textarea');
                    input.classList.add('form__input');
                    input.cols = 30;
                    input.rows = 10;
                    label.setAttribute('for', 'message');
                    label.innerHTML = 'Wiadomość';
                    alert.innerText = 'Wiadomość nie może być pusta';
                    input.addEventListener('focusout', () => {
                        this.validateInput(input, alert);
                    }, false);
                    break;
                }
            }

            inputContainer.appendChild(input);
            this.inputs.push(input);
            inputContainer.appendChild(label);
            inputContainer.appendChild(alert);

            form.appendChild(inputContainer);
        }

        const submitBtn = document.createElement('input');
        submitBtn.classList.add('form__submit-btn');
        submitBtn.type = 'submit';
        submitBtn.value = 'Wyślij';
        submitBtn.addEventListener('click', (e) => {
            this.sendEmail(e, submitBtn);
        }, false);

        form.appendChild(submitBtn);

        this.formContainer.insertBefore(form, this.formContainer.children[0]);

        return form;
    }

    styleInput = input => {
        if (input.value !== '') {
            input.classList.add('form__input--is-filled');
        } else input.classList.remove('form__input--is-filled');
    }

    displayAlert = (input, alert, flag) => {
        if (!flag) {
            alert.style.display = 'none';
            input.classList.remove('form__input--with-alert');
            void alert.offsetWidth; //do sth but nothing (necessary to restart animation)
            alert.style.display = 'block';
            input.classList.add('form__input--with-alert');

        } else {
            alert.style.display = 'none';
            input.classList.remove('form__input--with-alert');
        }
    }

    validateInput = (input, alert) => {
        this.styleInput(input);
        let flag = false;
        if (input.type === 'email') {
            if (input.value === '') {
                alert.innerText = 'Email nie może być pusty';
            } else {
                const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (re.test(input.value)) flag = true;
                alert.innerText = 'Email jest nieprawidłowy';
            }
        } else if (input.value !== '') flag = true;

        this.displayAlert(input, alert, flag);

        return flag;
    }

    validateForm = (e) => {
        e.preventDefault();
        let flag = true;
        for (let i = 0; i < 4; i++) {
            if (!this.validateInput(this.form.children[i].children[0], this.form.children[i].children[2])) flag = false;
        }
        return flag;
    }

    sendEmail = (e, submitBtn) => {
        if (this.validateForm(e)) {
            submitBtn.value = 'Sending...';

            const timer = setTimeout(() => {
                submitBtn.value = 'Done!';

                const timer2 = setTimeout(() => {
                    submitBtn.value = 'Wyślij';
                    this.setInputsState(false);
                }, 2000)
            }, 2000);

            let data = {
                name: this.inputs[0].value,
                email: this.inputs[1].value,
                subject: this.inputs[2].value,
                message: this.inputs[3].value
            };

            this.setInputsState(true);

            data = JSON.stringify(data);

            console.log(data);
        } else console.log("Popraw dane");
    }

    setInputsState = flag => {
        for (let i = 0; i < this.inputs.length; i++) {
            this.inputs[i].disabled = flag;
        }
    }
}
