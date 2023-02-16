import './auth.css';
import { authorizationButtonsChangeForm, authorizationPage, hidePage } from './page';
import { authentificationEmailWithPassword, authorization, loginBD, readOneUserToBD, writeUserToBD } from './api';
import { validation } from './validation';
import { returnToken, returnTokenName, saveTokenAndName } from './token';
import { createBody } from './body';
import { curMonths, curYears, renderCalendar } from '../calendar/calendar';
import { calendarDiv, insertAddBtn } from '../habit/habit';
import { renderMainPage } from '../render/render';

const BODY = document.querySelector('body') as HTMLElement;

export function checkToken() {
    const token: string | null = localStorage.getItem('IdToken2');
    if (token) {
        const token = returnToken();
        const nameUser = returnTokenName();
        if (token && nameUser) {
            readOneUserToBD(nameUser, token).then((data) => console.log(data));
            renderMainPage();
        }
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
            authentificationEmailWithPassword(email, password);
            const token = returnToken();
            const nameUser = returnToken();
            if (token && nameUser) {
                readOneUserToBD(token, nameUser);
                hidePage();
                renderMainPage();
            }
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
        authentificationButton.classList.remove('hihideAuthe');
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
        authorization(email, password)
            .then(() => writeUserToBD(createBody(), login))
            .then((id) => {
                if (id) {
                    saveTokenAndName('IdToken2', id);
                    readOneUserToBD(login, id);
                    hidePage();
                    renderMainPage();
                }
            });
        e.preventDefault();
        return { email, password };
    });
}
