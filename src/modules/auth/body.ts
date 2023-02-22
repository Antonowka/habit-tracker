import { MyHabitsList, MyNotesList } from '../../interface/interface';

export function createBody() {
    const body: MyHabitsList = [
        {
            name: '',
            goal: 0,
            date: [''],
        },
    ];
    return body;
}
export function createNote() {
    const body: MyNotesList = [
        {
            text: 'Hello to Habit!',
            date: '',
            color: '',
            posLeft: 0,
            posTop: 0,
            zIndex: 0,
            degRotate: 0,
        },
    ];
    return body;
}
