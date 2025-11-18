interface Base {
    id: string;
    created_at: string;
    updated_at: string;
}

export type Department = {
    id: string;
    title: string;
} & Base;

export type Character = {
    first_name: string;
    last_name: string;
    sex: 'Male' | 'Female';
} & Base;

export type Season = {
    number: number;
    start_date: string;
    end_date: string;
    overview: string;
} & Base;
