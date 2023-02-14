import './styles/main.css';

import { renderCalendar, curMonths, curYears } from './modules/calendar/calendar';
import { insertAddBtn, calendarDiv } from './modules/habit/habit';

renderCalendar(curMonths, curYears);
calendarDiv?.after(insertAddBtn());
