import { curMonths, curYears, renderCalendar } from '../calendar/calendar';
import { calendarDiv, insertAddBtn } from '../habit/habit';

export const renderMainPage = () => {
    renderCalendar(curMonths, curYears);
    calendarDiv?.after(insertAddBtn());
};
