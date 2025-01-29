export type Group = {
    id: number;
    name: string;
    sport: string;
    joinCode?: string; // Optional for Available Groups
    memberCount?: number; // Optional for My Groups
};

// LeaderboardUser.ts
export type LeaderboardUser = {
    user_id: number;
    name: string;
    wins: number;
    losses: number;
    total_matches: number;
};

// Match.ts
export type Match = {
    match_id: number;
    group_id: number;
    winner_id: number;
    loser_id: number;
    balls_left: number | null; // Optional
    date_posted: string; // ISO format date string
};
