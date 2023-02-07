import './calendar.css';

export const curMonths = new Date().getMonth();
export const curYears = new Date().getFullYear();

const calendar = document.createElement('div') as HTMLElement;
calendar.className = 'calendar';
document.body.appendChild(calendar);

const headerCalendar = document.createElement('div') as HTMLElement;
headerCalendar.className = 'header-calendar';

const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export function renderCalendar(month: number, year: number): void {
    const date = new Date(year, month);
    const table = document.createElement('table');
    table.className = 'table';
    const tableHead = document.createElement('thead');
    tableHead.className = 'table-head';
    const tableBody = document.createElement('tbody');
    tableBody.className = 'table-body';
    const headerRow = document.createElement('tr');
    headerRow.className = 'header-row';
    const tableRow = document.createElement('tr');
    tableRow.className = 'body-row';

    // create cell HABITs. First table cell
    const headCellHabits = document.createElement('th');
    headerRow.appendChild(headCellHabits);
    const tableCellHabits = document.createElement('td');
    tableCellHabits.textContent = 'Habits';
    tableCellHabits.className = 'body-cell-habits';
    tableRow.appendChild(tableCellHabits);

    // create the header row with the days of the week
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = date.getDay();
    const daysOfWeek = []; // all days of week 0-6 full month
    for (let i = firstDayOfMonth; i <= daysInMonth + firstDayOfMonth - 1; i++) {
        daysOfWeek.push(i % 7);
    }

    daysOfWeek.forEach((day) => {
        const headCell = document.createElement('th');
        headCell.className = 'header-cell';
        headCell.textContent = (day as unknown) as string;

        if (headCell.textContent === '0') {
            headCell.textContent = 'Sun';
            headCell.style.color = 'Red';
        } else if (headCell.textContent === '1') {
            headCell.textContent = 'Mon';
        } else if (headCell.textContent === '2') {
            headCell.textContent = 'Tue';
        } else if (headCell.textContent === '3') {
            headCell.textContent = 'Wed';
        } else if (headCell.textContent === '4') {
            headCell.textContent = 'Thu';
        } else if (headCell.textContent === '5') {
            headCell.textContent = 'Fri';
        } else if (headCell.textContent === '6') {
            headCell.textContent = 'Sat';
            headCell.style.color = 'Red';
        }
        headerRow.appendChild(headCell);
    });
    tableHead.appendChild(headerRow);
    table.appendChild(tableHead);

    // fill in the calendar with the correct days
    const dateCounter = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    while (dateCounter <= endDate) {
        for (let i = 0; i < 31; i++) {
            const bodyCell = document.createElement('td');
            const dateId = dateCounter.getDate();
            bodyCell.className = 'body-cell';
            if (dateCounter.getMonth() !== date.getMonth()) {
                bodyCell.style.display = 'none';
            } else if (dateCounter.getMonth() === date.getMonth() && dateCounter.getFullYear() === date.getFullYear()) {
                bodyCell.textContent = (dateCounter.getDate() as unknown) as string;
                bodyCell.id = `${months[date.getMonth()]}-${date.getFullYear()}-${dateId}`;
            }
            tableRow.appendChild(bodyCell);
            dateCounter.setDate(dateCounter.getDate() + 1);
        }
        tableBody.appendChild(tableRow);
    }
    table.appendChild(tableBody);

    // create the month and year selectors
    const monthSelect = document.createElement('h2');
    const yearSelect = document.createElement('span');
    monthSelect.className = 'month';
    yearSelect.className = 'year';
    monthSelect.textContent = months[date.getMonth()];
    yearSelect.textContent = `, ${date.getFullYear()}`;

    // create the prev and next buttons
    const prevButton = document.createElement('button');
    prevButton.textContent = '<';
    prevButton.className = 'button prev-button';
    prevButton.addEventListener('click', function () {
        let prevMonth = date.getMonth() - 1;
        let prevYear = date.getFullYear();
        if (prevMonth < 0) {
            prevMonth = 11;
            prevYear--;
        }
        renderCalendar(prevMonth, prevYear);
    });

    const nextButton = document.createElement('button');
    nextButton.textContent = '>';
    nextButton.className = 'button next-button';
    nextButton.addEventListener('click', function () {
        let nextMonth = date.getMonth() + 1;
        let nextYear = date.getFullYear();
        if (nextMonth > 11) {
            nextMonth = 0;
            nextYear++;
        }
        renderCalendar(nextMonth, nextYear);
    });

    calendar.innerHTML = '';
    headerCalendar.innerHTML = '';
    calendar.appendChild(headerCalendar);
    headerCalendar.appendChild(prevButton);
    headerCalendar.appendChild(monthSelect);
    monthSelect.appendChild(yearSelect);
    headerCalendar.appendChild(nextButton);
    calendar.appendChild(table);

    // create cell Goal and Achieved
    const bodyCellLasts = document.createElement('td');
    bodyCellLasts.className = 'body-cell-goal';
    bodyCellLasts.textContent = 'Goal';
    tableRow.appendChild(bodyCellLasts);
    const bodyCellAchieved = document.createElement('td');
    bodyCellAchieved.className = 'body-cell-achieved';
    bodyCellAchieved.textContent = 'Achieved';
    tableRow.appendChild(bodyCellAchieved);
}
