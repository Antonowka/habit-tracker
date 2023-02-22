export interface data {
    name: string;
    goal: number;
    date: Array<string>;
}

export type MyHabitsList = [data];

export type test = [];

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

export interface INote {
    text: string;
    date: string;
    color: string;
    posLeft: number;
    posTop: number;
    zIndex: number;
    degRotate: number;
}

export type MyNotesList = [INote];

export interface INotes {
    notes: Array<data>;
}
