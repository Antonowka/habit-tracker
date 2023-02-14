export function showError(tag: string, message: string) {
    (document.getElementById(tag) as HTMLElement).innerText = message;
}
