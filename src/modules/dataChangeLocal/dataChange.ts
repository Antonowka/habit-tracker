import { readAllUsersToBD } from '../auth/api';
import { returnToken, saveTokenAndName, returnTokenBody, returnTokenEmail, returnTokenBodyBD } from '../auth/token';

import { updateUserToBD } from '../auth/api';

export function UPDATE() {
    const body = JSON.parse(returnTokenBody() || '');
    const email = returnTokenEmail();
    const tokenID = returnToken();
    // const data = JSON.parse(returnTokenBodyBD() || '');
    // const user = JSON.stringify(data.user);

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
    const body = JSON.parse(returnTokenBodyBD() || '');
    saveTokenAndName('RS-habit', JSON.stringify(body.habits));
}
