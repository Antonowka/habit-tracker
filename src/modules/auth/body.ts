import { MyHabitsList } from '../../interface/interface';

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
