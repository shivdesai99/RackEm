export type Group = {
    id: number;
    name: string;
    sport: string;
    joinCode?: string; // Optional for Available Groups
    memberCount?: number; // Optional for My Groups
};
