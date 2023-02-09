import { clickBtn } from './modalHabit';

const newHabitBtn = document.createElement('button');
newHabitBtn.className = 'btn-new-habit';
newHabitBtn.innerHTML = '+ New Habit';
export const calendarDiv = document.querySelector('.calendar');
newHabitBtn.addEventListener('click', clickBtn);

export function insertAddBtn(a: HTMLElement) {
    a?.after(newHabitBtn);
}

export function createRow() {
    const tableBody = document.querySelector('.table-body');
    const newRow = document.createElement('tr');

    if (Array.from((tableBody as HTMLElement).childNodes).length === 1) {
        newRow.className = 'row-1';
        tableBody?.append(newRow);
    } else {
        const arrRows = (tableBody as HTMLElement).children;
        const rowName = arrRows[arrRows.length - 1].className;
        const rowNumber = Number(rowName.slice(4));

        newRow.className = `row-${rowNumber + 1}`;
        tableBody?.append(newRow);
    }

    // get qty day of month **********
    const allDayOfMonth = document.querySelectorAll('.body-cell');
    const arrayAllDayOfMonth = Array.from(allDayOfMonth);
    const daysOfMonth = arrayAllDayOfMonth.filter((e) => e.id !== '').length;
    // *************

    const cellTableHabit = document.createElement('td');
    cellTableHabit.className = `td-habit`;
    (document.querySelector('.table-body')?.lastElementChild as HTMLElement).append(cellTableHabit);

    for (let i = 1; i < daysOfMonth + 1; i++) {
        const cellTable = document.createElement('td');
        cellTable.className = `td-${i}`;
        cellTable.addEventListener('click', coloredTd);
        (document.querySelector('.table-body')?.lastElementChild as HTMLElement).append(cellTable);
    }

    const cellTableGoal = document.createElement('td');
    cellTableGoal.className = `td-goal`;
    (document.querySelector('.table-body')?.lastElementChild as HTMLElement).append(cellTableGoal);

    const cellTableAchieved = document.createElement('td');
    cellTableAchieved.className = `td-achieved`;
    cellTableAchieved.innerHTML = '0';
    (document.querySelector('.table-body')?.lastElementChild as HTMLElement).append(cellTableAchieved);
}

export function fillRow() {
    const inputHabitName = (document.getElementById('modal-name-input') as HTMLInputElement).value;
    const inputHabitGoal = (document.getElementById('modal-goal-input') as HTMLInputElement).value;

    const tdHabit = document.querySelector('.table-body')?.lastElementChild?.firstElementChild;
    const tdRow = document.querySelector('.table-body')?.lastElementChild?.childNodes;
    const tdGoal = (tdRow as NodeList)[(tdRow as NodeList).length - 2];

    (tdHabit as HTMLElement).innerHTML = `${inputHabitName}`;
    (tdGoal as HTMLElement).innerHTML = `${inputHabitGoal}`;
}

export function coloredTd(e: Event) {
    (e.target as HTMLElement).classList.toggle('td-colored');

    if ((e.target as HTMLElement).innerHTML === '') {
        (e.target as HTMLElement).innerHTML = '+';
    } else {
        (e.target as HTMLElement).innerHTML = '';
    }

    countAchieved(e);
}

export function countAchieved(e: Event) {
    const parentEl = (e.target as HTMLElement).parentElement;
    const tdAchieved = parentEl?.lastElementChild;
    const allColoredTd = document.querySelectorAll('.td-colored');
    const allColoredTdArray = Array.prototype.slice.call(allColoredTd);
    const countElements = allColoredTdArray.filter((el) => el.parentElement === parentEl);

    const allTdGoal = parentEl?.childNodes;
    const tdGoal = (allTdGoal as NodeList)[(allTdGoal as NodeList).length - 2];

    (tdAchieved as HTMLElement).innerHTML = `${countElements.length}`;

    if (Number(tdAchieved?.textContent) >= Number(tdGoal.textContent)) {
        tdAchieved?.classList.add('td-complete');
    } else {
        tdAchieved?.classList.remove('td-complete');
    }
}
