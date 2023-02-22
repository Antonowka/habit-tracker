import { curMonths, curYears, renderCalendar } from '../calendar/calendar';
import { calendarDiv, insertAddBtn, renderHabits } from '../habit/habit';
import { nodsHeader } from '../nodes/headerNode';
import { nodsFooter } from '../nodes/footerNode';
import { switchTheme } from '../themes/themeSwitcher';
import { insertAddNoteBtn } from '../notes/notes';
import { createNotes } from '../notes/notes';
import { howItWorkButton } from '../howItWorks/howItWork';

export const renderMainPage = () => {
    nodsHeader();
    renderCalendar(curMonths, curYears);
    calendarDiv?.after(insertAddNoteBtn());
    calendarDiv?.after(insertAddBtn());
    renderHabits();
    nodsFooter();
    switchTheme();
    createNotes();
    howItWorkButton();
};
