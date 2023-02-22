import './auth.css';
import { authorizationButtonsChangeForm, authorizationPage, hidePage } from './page';
import { authentificationEmailWithPassword, authorization, loginBD, readAllUsersToBD, writeUserToBD } from './api';
import { validation } from './validation';
import { returnToken, returnTokenEmail, saveTokenAndName } from './token';
import { renderMainPage } from '../render/render';
import { SAVE_DATA_BD } from '../dataChangeLocal/dataChange';
import { createNote } from './body';

const BODY = document.querySelector('body') as HTMLElement;

export function checkToken() {
    const token = returnToken();
    const email = returnTokenEmail();
    if (token && email) {
        readAllUsersToBD(email)
            .then(() => {
                SAVE_DATA_BD();
            })
            .then(() => {
                renderMainPage();
            });
        hidePage();
    } else {
        BODY.append(authorizationButtonsChangeForm());
        BODY.append(authorizationPage());
        registrationChangeFunction();
        authentificationFunction();
        authorizationChangeButton();
        validation();
    }
}

function authentificationFunction() {
    const authentificationButton = document.getElementById('authentificationButton') as HTMLButtonElement;
    authentificationButton.addEventListener('click', (e) => {
        const email: string | null = (document.getElementById('email') as HTMLInputElement).value;
        const password: string | null = (document.getElementById('password') as HTMLInputElement).value;
        if (email && password) {
            authentificationEmailWithPassword(email, password).then(() => {
                readAllUsersToBD(email)
                    .then(() => {
                        hidePage();
                        SAVE_DATA_BD();
                        saveTokenAndName('emailForRead', email);
                    })
                    .then(() => {
                        renderMainPage();
                        history.go(0);
                    });
            });
        }
        e.preventDefault();
    });
}

function registrationChangeFunction() {
    const authentificationButton = document.getElementById('authentificationButton') as HTMLButtonElement;
    const createButton = document.getElementById('createButton') as HTMLButtonElement;
    const registrationButton = document.getElementById('registration') as HTMLButtonElement;
    const inputLogin = document.querySelectorAll('.login');
    const authorizationButton = document.getElementById('authorizationButton') as HTMLButtonElement;

    registrationButton.addEventListener('click', () => {
        authorizationButton.classList.add('hideAuth');
        inputLogin.forEach((item) => item.classList.add('hideAuth'));
        authentificationButton.classList.remove('hideAuth');
        registrationButton.classList.add('activeAuth');
        createButton.classList.remove('activeAuth');
    });
    createButton.addEventListener('click', () => {
        authorizationButton.classList.remove('hideAuth');
        inputLogin.forEach((item) => item.classList.remove('hideAuth'));
        authentificationButton.classList.add('hideAuth');
        registrationButton.classList.remove('activeAuth');
        createButton.classList.add('activeAuth');
    });
}

function authorizationChangeButton() {
    const authorizationButton = document.getElementById('authorizationButton') as HTMLButtonElement;
    authorizationButton.addEventListener('click', (e) => {
        const email: string | null = (document.getElementById('email') as HTMLInputElement).value;
        const password: string | null = (document.getElementById('password') as HTMLInputElement).value;
        const login: string | null = (document.getElementById('login') as HTMLInputElement).value;
        if (login) {
            loginBD(login);
            saveTokenAndName('nameToDoUser', login);
        }
        if (email) {
            saveTokenAndName('emailForRead', email);
        }
        if (email && password) {
            authorization(email, password)
                .then(() => writeUserToBD([], email, login, createNote(), 'light'))
                .then((id) => {
                    if (id) {
                        saveTokenAndName('IDForFined', id);
                        readAllUsersToBD(email);
                        hidePage();
                        renderMainPage();
                        history.go(0);
                    }
                });
        }
        e.preventDefault();
        return { email, password };
    });
}
