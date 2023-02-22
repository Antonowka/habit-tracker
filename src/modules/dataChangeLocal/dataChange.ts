import { readAllUsersToBD } from '../auth/api';
import {
    returnToken,
    saveTokenAndName,
    returnTokenBody,
    returnTokenEmail,
    returnTokenBodyBD,
    returnTokenNotes,
    returnThemes,
} from '../auth/token';

import { updateUserToBD } from '../auth/api';

export function UPDATE() {
    const body = JSON.parse(returnTokenBody() || '[]');
    const notes = JSON.parse(returnTokenNotes() || '[]');
    const email = returnTokenEmail();
    const tokenID = returnToken();
    const themes = returnThemes();
    // const data = JSON.parse(returnTokenBodyBD() || '');
    // const user = JSON.stringify(data.user);
    if (body && email && tokenID && themes) {
        updateUserToBD(body, email, tokenID, notes, themes).then(() => {
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
    saveTokenAndName('mode', JSON.stringify(body.themes));
}
