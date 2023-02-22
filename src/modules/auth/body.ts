import { MyHabitsList, MyNotesList } from '../../interface/interface';
import { currDate } from '../notes/notes';

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
            date: `${currDate}`,
            color: '#FFE76E',
            posLeft: 150,
            posTop: 150,
            zIndex: 1,
            degRotate: -3,
        },
    ];
    return body;
}
