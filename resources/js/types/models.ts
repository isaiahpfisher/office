interface Base {
    id: number;
    created_at: string;
    updated_at: string;
}

export type Actor = {
    first_name: string;
    last_name: string;
    characters: Character[];
} & Base;

export type Character = {
    first_name: string;
    last_name: string;
    sex: 'Male' | 'Female';
    actor_id: string;
    actor: Actor;
} & Base;

export type Role = {
    title: string;
    start_date: string;
    end_date: string;
    character: Character;
} & Base;

export type Season = {
    number: number;
    start_date: string;
    end_date: string;
    overview: string;
} & Base;

export type Episode = {
    title: string;
    summary: string;
    air_date: string;
    season_id: string;
    season: Season;
    cold_open: ColdOpen;
} & Base;

export type ColdOpen = {
    description: string;
    episode_id: string;
    episode: Episode;
} & Base;

export type Department = {
    title: string;
} & Base;

export type Branch = {
    city: string;
} & Base;
