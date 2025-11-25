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
    department_id: string;
    actor: Actor;
    department: Department;
    roles: Role[];
    relationships: Relationship[];
    things_she_said: ThingSheSaid[];
    quotes: Quote[];
    branches: Branch[];
    episodes: Episode[];
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
    episodes: Episode[];
} & Base;

export type Episode = {
    title: string;
    summary: string;
    air_date: string;
    season_id: string;
    season: Season;
    cold_open: ColdOpen;
    characters: Character[];
    quotes: Quote[];
    things_she_said: ThingSheSaid[];
    pranks: Prank[];
} & Base;

export type ColdOpen = {
    description: string;
    episode_id: string;
    episode: Episode;
} & Base;

export type Department = {
    title: string;
    characters: Character[];
} & Base;

export type Branch = {
    city: string;
    characters: Character[];
} & Base;

export type Prank = {
    description: string;
    episode_id: string;
    episode: Episode;
} & Base;

export type ThingSheSaid = {
    saying: string;
    episode_id: string;
    episode: Episode;
    character_id: string;
    character: Character;
} & Base;

export type Quote = {
    quote: string;
    episode_id: string;
    episode: Episode;
    character_id: string;
    character: Character;
} & Base;

export type Relationship = {
    outcome: 'Break Up' | 'Marriage' | 'Affair' | 'Other';
    person_one_id: string;
    person_one: Character;
    person_two_id: string;
    person_two: Character;
    affairs: Affair[];
} & Base;

export type Affair = {
    cheating_id: string;
    cheating: Relationship;
    cheated_id: string;
    cheated: Relationship;
} & Base;
