import { clickBtn } from './modalHabit';
import { allHabits, closeModal, habitModalNameInput, habitModalGoalInput } from './modalHabit';
import { IHabit } from '../../interface/interface';
import { validateModalForms } from './modalHabit';
import { renderHabits } from './habit';

const btnEditSave = document.createElement('button');
btnEditSave.className = 'btn-edit-save';
btnEditSave.innerHTML = 'Save';
btnEditSave.addEventListener('click', saveNewDB);

const btnEditDel = document.createElement('button');
btnEditDel.className = 'btn-edit-del';
btnEditDel.innerHTML = 'Delete';
btnEditDel.addEventListener('click', delHabitFromDB);

export function getModalEdit(e: Event) {
    const currHabitName: string = (e.target as Element).textContent as string;
    const currHabitGoal = allHabits.find((el: IHabit) => el.name === currHabitName).goal;
    const currId = Number((e.target as Element).parentElement?.className.slice(4));
    btnEditSave.name = `${currId}`;

    clickBtn();
    (document.querySelector('.btn-modal-save') as HTMLElement).style.display = 'none';
    (document.getElementById('modal-name-input') as HTMLInputElement).value = currHabitName;
    (document.getElementById('modal-goal-input') as HTMLInputElement).value = currHabitGoal;

    (document.querySelector('.modal-header') as HTMLElement).innerHTML = 'Edit Habit';
    document.querySelector('.modal-add-habit')?.append(btnEditSave, btnEditDel);

    (document.querySelector('.btn-edit-save') as HTMLElement).style.display = 'block';
    (document.querySelector('.btn-edit-del') as HTMLElement).style.display = 'block';
}

export function saveNewDB() {
    const newHabitsDB = allHabits;
    const inputHabitName = (document.getElementById('modal-name-input') as HTMLInputElement).value;
    const inputHabitGoal = (document.getElementById('modal-goal-input') as HTMLInputElement).value;

    validateModalForms();

    if (habitModalNameInput.className === 'modal-name-input' && habitModalGoalInput.className === 'modal-goal-input') {
        closeModal();
        newHabitsDB[Number(btnEditSave.name) - 1].name = inputHabitName;
        newHabitsDB[Number(btnEditSave.name) - 1].goal = inputHabitGoal;
        localStorage.setItem('RS-habit', JSON.stringify(newHabitsDB));

        document.querySelectorAll('[class^="row-"]').forEach((e) => e.remove());
        renderHabits();
    }
}

export function delHabitFromDB() {
    const newHabitsDB = allHabits;

    newHabitsDB.splice(Number(btnEditSave.name) - 1, 1);
    closeModal();
    localStorage.setItem('RS-habit', JSON.stringify(newHabitsDB));

    document.querySelectorAll('[class^="row-"]').forEach((e) => e.remove());
    renderHabits();
}
