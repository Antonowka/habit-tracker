
export interface data {
    name: string;
    goal: number;
    data: Array<string>;
}

export type MyHabitsList = [data];

export interface habits {
    habits: Array<data>;
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
