import { habits } from '../../interface/interface';

export function createBody() {
    const body: habits = {
        habits: [
            {
                name: '',
                id: 0,
                tracks: [{ date: '' }],
            },
        ],
    };
    return body;
}
