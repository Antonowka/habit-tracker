import './styles/main.css';

import { renderCalendar, curMonths, curYears } from './modules/calendar/calendar';
import { insertAddBtn } from './modules/habit/habit';

renderCalendar(curMonths, curYears);
insertAddBtn();
