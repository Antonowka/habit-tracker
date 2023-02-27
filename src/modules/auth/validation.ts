export function validation() {
    const enterButton = document.getElementById('authentificationButton') as HTMLButtonElement;
    const createButton = document.getElementById('authorizationButton') as HTMLButtonElement;

    const emailInput = document.getElementById('email') as HTMLInputElement;
    const emailError = document.getElementById('errorEmail') as HTMLSpanElement;
    emailInput.onblur = function () {
        if (!emailInput.value.includes('@')) {
            emailInput.classList.add('invalid');
            emailError.innerHTML = 'Пожалуйста, введите правильный email.';
            if (enterButton) {
                enterButton.disabled = true;
            }
            if (createButton) {
                createButton.disabled = true;
            }
        } else {
            if (enterButton) {
                enterButton.disabled = false;
            }
            if (createButton) {
                createButton.disabled = false;
            }
        }
    };

    emailInput.onfocus = function () {
        if ((this as HTMLButtonElement).classList.contains('invalid')) {
            (this as HTMLButtonElement).classList.remove('invalid');
            emailError.innerHTML = '';
        }
    };
    const LoginInput = document.getElementById('login') as HTMLInputElement;
    const loginError = document.getElementById('errorLogin') as HTMLSpanElement;
    LoginInput.onblur = function () {
        if (LoginInput.value.length === 0) {
            LoginInput.classList.add('invalid');
            loginError.innerHTML = 'Введите логин';
            if (createButton) {
                createButton.disabled = true;
            }
        } else {
            if (createButton) {
                createButton.disabled = false;
            }
        }
    };

    LoginInput.onfocus = function () {
        if ((this as HTMLButtonElement).classList.contains('invalid')) {
            (this as HTMLButtonElement).classList.remove('invalid');
            loginError.innerHTML = '';
        }
    };
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const passwordError = document.getElementById('errorPassword') as HTMLSpanElement;
    passwordInput.onblur = function () {
        if (passwordInput.value.length < 6) {
            passwordInput.classList.add('invalid');
            passwordError.innerHTML = 'Пароль должен быть не менее 6 символов';
            if (enterButton) {
                enterButton.disabled = true;
            }
            if (createButton) {
                createButton.disabled = true;
            }
        } else {
            if (enterButton) {
                enterButton.disabled = false;
            }
            if (createButton) {
                createButton.disabled = false;
            }
        }
    };

    passwordInput.onfocus = function () {
        if ((this as HTMLButtonElement).classList.contains('invalid')) {
            (this as HTMLButtonElement).classList.remove('invalid');
            passwordError.innerHTML = '';
        }
    };
}
