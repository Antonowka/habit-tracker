import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, updateDoc, doc, getDocs } from 'firebase/firestore';
import { habits, INotes, MyNotesList, test } from '../../interface/interface';
import { showError } from './error';
import { saveTokenAndName } from './token';

const firebaseConfig = {
    apiKey: 'AIzaSyA2sAk5jv8bfimFINTJaldLfuGEXq3JA1k',
    authDomain: 'clone-b687d.firebaseapp.com',
    projectId: 'clone-b687d',
    storageBucket: 'clone-b687d.appspot.com',
    messagingSenderId: '556368884529',
    appId: '1:556368884529:web:a078da48197912dcf97610',
    measurementId: 'G-15Q3P90YDR',
};

const app = initializeApp(firebaseConfig);
const dataBase = getFirestore(app);
const auth = getAuth(app);

export function authorization(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return userCredential;
        })
        .then((data) => {
            console.log('Ответ авторизации: ', data);
        })
        .catch((error) => showError('showError', error.message));
}

export function authentificationEmailWithPassword(email: string, password: string) {
    //ключ для всего приложения
    const ApiKey = 'AIzaSyA2sAk5jv8bfimFINTJaldLfuGEXq3JA1k';
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ApiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => {
            if (res.status >= 400) {
                showError('showError', 'неверный пароль');
            }
            return res.json();
        })
        .then((res) => {
            if (res.error) {
                return showError('showError', 'неверный пароль');
            }
            return res.idToken;
        })
        .catch((error) => console.log('showError', error.message));
}

export function loginBD(login: string) {
    return `https://clone-b687d-default-rtdb.europe-west1.firebasedatabase.app/${login}.json`;
}

//первый раз
export async function writeUserToBD(habits: test, login: string, user: string, notes: MyNotesList, themes: string) {
    const colections = collection(dataBase, login);
    try {
        const docRef = await addDoc(colections, { habits, user, notes, themes });
        return docRef.id;
    } catch (e) {
        console.error('Error adding document: ', e);
    }
}

export async function updateUserToBD(habits: habits, login: string, token: string, notes: INotes, themes: string) {
    const update = doc(dataBase, login, token);
    try {
        const docRef = await updateDoc(update, { habits, notes, themes });
        // console.log('Document written with ID: ', docRef);
        return docRef;
    } catch (e) {
        console.error('Error adding document: ', e);
    }
}

export async function readAllUsersToBD(email: string) {
    const querySnapshot = await getDocs(collection(dataBase, email));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        saveTokenAndName('IDForFined', doc.id);
        saveTokenAndName('BodyResp', JSON.stringify(doc.data()));
        // console.log(doc.data());
    });
}
