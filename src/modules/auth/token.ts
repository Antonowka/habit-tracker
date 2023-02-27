export function saveTokenAndName(cell: string, token: string) {
    if (!token) {
        return console.log('token is not set');
    }
    localStorage.setItem(cell, token);
}

export function returnToken() {
    return localStorage.getItem('IdToken2');
}

export function returnTokenName() {
    return localStorage.getItem('nameToDoUser');
}
