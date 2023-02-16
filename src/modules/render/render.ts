import { curMonths, curYears, renderCalendar } from '../calendar/calendar';
import { calendarDiv, insertAddBtn } from '../habit/habit';
import { nodsHeader } from '../nodes/headerNode';
import { nodsFooter } from '../nodes/footerNode';
import { switchTheme } from '../themes/themeSwitcher';

export const renderMainPage = () => {
    nodsHeader();
    renderCalendar(curMonths, curYears);
    calendarDiv?.after(insertAddBtn());
    nodsFooter();
    switchTheme();
};
