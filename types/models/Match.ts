export type Match = {
    match_id: number;
    group_id: number;
    winner_id: number;
    loser_id: number;
    balls_left: number | null;
    date_posted: string;
    winner_name: string;
    loser_name: string;
};
