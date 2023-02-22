import { returnThemes } from '../auth/token';
import { UPDATE } from '../dataChangeLocal/dataChange';

// async function returnTheme() {
//     return getMode;
//}/
export async function switchTheme() {
    const body: HTMLElement = document.querySelector('body') as HTMLElement;
    const modeToggle: HTMLElement = document.querySelector('.dark-light') as HTMLElement;
    const getMode = returnThemes();
    if (getMode && getMode === 'dark') {
        body.classList.add('dark');
        modeToggle.classList.toggle('active');
    }

    // js code to toggle dark and light mode
    modeToggle.addEventListener('click', () => {
        modeToggle.classList.toggle('active');
        body.classList.toggle('dark');

        // js code to keep user selected mode even page refresh or file reopen
        if (!body.classList.contains('dark')) {
            localStorage.setItem('mode', 'light');
            UPDATE();
        } else {
            localStorage.setItem('mode', 'dark');
            UPDATE();
        }
    });
}
