interface date {
    date: string;
}
interface tracks {
    name: string;
    id: number;
    tracks: Array<date>;
}
export interface habits {
    habits: Array<tracks>;
}
export interface dataUser {
    habits: habits;
}

// const ass: habits = {
//     habits: [
//         {
//             name: 'Бросить пить',
//             id: 47387834,
//             tracks: [{ date: '2202 - 12 - 2' }],
//         },
//     ],
// };

export interface IHabit {
    name: string;
    goal: number;
    date: string[];
}
