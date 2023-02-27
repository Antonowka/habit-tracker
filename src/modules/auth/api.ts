import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, updateDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { habits } from '../../interface/interface';
import { showError } from './error';

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

export async function writeUserToBD(users2: habits, login: string) {
    const colections = collection(dataBase, login);
    try {
        const docRef = await addDoc(colections, { users2 });
        return docRef.id;
    } catch (e) {
        console.error('Error adding document: ', e);
    }
}

export async function updateUserToBD(users2: habits, login: string, token: string) {
    const update = doc(dataBase, login, token);
    try {
        const docRef = await updateDoc(update, { users2 });
        console.log('Document written with ID: ', docRef);
    } catch (e) {
        console.error('Error adding document: ', e);
    }
}

export async function readOneUserToBD(login: string, token: string) {
    const docRef = doc(dataBase, login, token);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log('No such document!');
    }
}
// export async function readAllUsersToBD() {
//     const querySnapshot = await getDocs(collection(dataBase, 'users2'));
//     querySnapshot.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, ' => ', doc.data());
//     });
// }

// export function allCollection() {
// }
// ? Object.keys(data).map((key) => ({
//   ...data[key],
//   id: key,
// }))
// : [];
