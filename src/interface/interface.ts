export interface data {
    name: string;
    goal: number;
    date: Array<string>;
}

export type MyHabitsList = [data];

export interface habits {
    habits: Array<data>;
}

export interface dataUser {
    habits: habits;
}

export interface IHabit {
    name: string;
    goal: number;
    date: string[];
}
