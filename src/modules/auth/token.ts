export function saveTokenAndName(cell: string, token: string) {
    if (!token) {
        return console.log('token is not set');
    }
    localStorage.setItem(cell, token);
}

export function returnToken() {
    return localStorage.getItem('IDForFined');
}
export function returnTokenEmail() {
    return localStorage.getItem('emailForRead');
}
export function returnTokenBody() {
    return localStorage.getItem('RS-habit');
}
export function returnTokenNotes() {
    return localStorage.getItem('RS-notes');
}
export function returnTokenBodyBD() {
    return localStorage.getItem('BodyResp');
}
export function returnThemes() {
    return localStorage.getItem('mode');
}
