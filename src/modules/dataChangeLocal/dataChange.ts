import { readAllUsersToBD } from '../auth/api';
import {
    returnToken,
    saveTokenAndName,
    returnTokenBody,
    returnTokenEmail,
    returnTokenBodyBD,
    returnTokenNotes,
} from '../auth/token';

import { updateUserToBD } from '../auth/api';

export function UPDATE() {
    const body = JSON.parse(returnTokenBody() || '');
    const notes = JSON.parse(returnTokenNotes() || '');
    const email = returnTokenEmail();
    const tokenID = returnToken();
    // const data = JSON.parse(returnTokenBodyBD() || '');
    // const user = JSON.stringify(data.user);
    console.log(notes);
    if (body && email && tokenID) {
        updateUserToBD(body, email, tokenID, notes).then(() => {
            const email = returnTokenEmail();
            if (email) {
                readAllUsersToBD(email).then(() => {
                    SAVE_DATA_BD();
                });
            }
        });
    }
}

export function SAVE_DATA_BD() {
    const body = JSON.parse(returnTokenBodyBD() || '');
    saveTokenAndName('RS-habit', JSON.stringify(body.habits));
    saveTokenAndName('RS-notes', JSON.stringify(body.notes));
}
