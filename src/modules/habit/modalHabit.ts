import './modalHabit.css';
import { createRow, fillRow } from './habit';
import { UPDATE } from '../dataChangeLocal/dataChange';
import { divNoteModal } from '../notes/notes';

export const divTranspModal = document.createElement('div');
divTranspModal.className = 'transparent-modal';
divTranspModal.addEventListener('click', closeModal);

const divHabitModal = document.createElement('div');
divHabitModal.className = 'modal-add-habit';

export const habitModalHeader = document.createElement('div');
habitModalHeader.className = 'modal-header';

export const btnModalClose = document.createElement('button');
btnModalClose.className = 'btn-modal-close';
btnModalClose.innerHTML = 'X';
btnModalClose.addEventListener('click', closeModal);

const habitModalName = document.createElement('div');
habitModalName.className = 'modal-name';
habitModalName.innerHTML = 'Habit Name';

export const habitModalNameInput = document.createElement('input');
habitModalNameInput.className = 'modal-name-input';
habitModalNameInput.id = 'modal-name-input';
habitModalNameInput.placeholder = 'Eg. Exercise';

const habitModalGoal = document.createElement('div');
habitModalGoal.className = 'modal-goal';
habitModalGoal.innerHTML = 'Goal';

export const habitModalGoalInput = document.createElement('input');
habitModalGoalInput.className = 'modal-goal-input';
habitModalGoalInput.id = 'modal-goal-input';
habitModalGoalInput.placeholder = 'Number of times to perform habit in a month';
habitModalGoalInput.pattern = '[0-9]{2}';
habitModalGoalInput.addEventListener('input', validateGoal);

const btnModalSave = document.createElement('button');
btnModalSave.className = 'btn-modal-save';
btnModalSave.innerHTML = 'Save';
btnModalSave.addEventListener('click', saveModal);

if (localStorage.getItem('RS-habit') === null) {
    localStorage.setItem('RS-habit', JSON.stringify([]));
    UPDATE();
}

export const allHabits = JSON.parse(localStorage.getItem('RS-habit') || '');

export function clickBtn() {
    document.body.append(divTranspModal);
    document.body.append(divHabitModal);
    document
        .querySelector('.modal-add-habit')
        ?.append(
            habitModalHeader,
            btnModalClose,
            habitModalName,
            habitModalNameInput,
            habitModalGoal,
            habitModalGoalInput,
            btnModalSave
        );

    divTranspModal.style.display = 'flex';
    divHabitModal.style.display = 'flex';
    btnModalSave.style.display = 'block';
    habitModalHeader.innerHTML = 'Create New Habit';
    if (document.querySelector('.btn-edit-save')) {
        (document.querySelector('.btn-edit-save') as HTMLElement).style.display = 'none';
    }

    if (document.querySelector('.btn-edit-del')) {
        (document.querySelector('.btn-edit-del') as HTMLElement).style.display = 'none';
    }

    (document.getElementById('modal-name-input') as HTMLInputElement).value = '';
    (document.getElementById('modal-goal-input') as HTMLInputElement).value = '';
}

export function closeModal() {
    divTranspModal.style.display = 'none';
    divHabitModal.style.display = 'none';
    divNoteModal.style.display = 'none';
}

export function saveModal() {
    validateModalForms();
    if (habitModalNameInput.className === 'modal-name-input' && habitModalGoalInput.className === 'modal-goal-input') {
        closeModal();
        fillDB();
        createRow();
        fillRow(allHabits.length - 1);
    }
}

function validateGoal(e: Event) {
    const z = (e.target as HTMLInputElement).value.replace(/\D/g, '').match(/(\d{0,2})/);
    (e.target as HTMLInputElement).value = !(z as RegExpMatchArray)[2]
        ? (z as RegExpMatchArray)[1]
        : (z as RegExpMatchArray)[1];
}

export function validateModalForms() {
    if (habitModalNameInput.value.length === 0) {
        habitModalNameInput.classList.add('modal-input-error');
    } else {
        habitModalNameInput.classList.remove('modal-input-error');
    }

    if (
        habitModalGoalInput.value.length === 0 ||
        Number(habitModalGoalInput.value) > 31 ||
        Number(habitModalGoalInput.value) === 0
    ) {
        habitModalGoalInput.classList.add('modal-input-error');
    } else {
        habitModalGoalInput.classList.remove('modal-input-error');
    }
}

export function fillDB() {
    const inputHabitName = (document.getElementById('modal-name-input') as HTMLInputElement).value;
    const inputHabitGoal = (document.getElementById('modal-goal-input') as HTMLInputElement).value;

    allHabits.push({
        name: String(inputHabitName),
        goal: Number(inputHabitGoal),
        date: [],
    });

    localStorage.setItem('RS-habit', JSON.stringify(allHabits));
    UPDATE();
}
