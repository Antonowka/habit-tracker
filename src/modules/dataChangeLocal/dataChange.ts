import { readAllUsersToBD } from '../auth/api';
import { returnToken, saveTokenAndName, returnTokenBody, returnTokenEmail } from '../auth/token';

import { updateUserToBD } from '../auth/api';

export function UPDATE() {
    const body = JSON.parse(returnTokenBody() || '');
    const email = returnTokenEmail();
    const tokenID = returnToken();

    if (body && email && tokenID) {
        updateUserToBD(body, email, tokenID).then(() => {
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
    const body = JSON.parse(returnTokenBody() || '');
    saveTokenAndName('RS-habit', body.habits);
}
