import axios from "axios";
import { Group } from "@/types/models/Group";
import { LeaderboardUser } from "@/types/models/LeaderboardUser";
import { Match } from "@/types/models/Match";

const apiClient = axios.create({
    baseURL: "http://localhost:5001/group-page", // Base API URL
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Fetch group metadata by ID.
 * @param groupId - The ID of the group.
 * @param token - The authentication token.
 * @returns Group metadata.
 */
export const fetchGroupByIdAPI = async (
    groupId: number,
    token: string
): Promise<Group> => {
    try {
        const response = await apiClient.get(`/${groupId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.group;
    } catch (error: any) {
        console.error("Error fetching group metadata:", error.response?.data);
        throw new Error(
            error.response?.data?.message || "Failed to fetch group data."
        );
    }
};

/**
 * Fetch leaderboard data for a group.
 * @param groupId - The ID of the group.
 * @param token - The authentication token.
 * @returns Leaderboard data.
 */
export const fetchLeaderboardAPI = async (
    groupId: number,
    token: string
): Promise<LeaderboardUser[]> => {
    try {
        const response = await apiClient.get(`/${groupId}/leaderboard`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error fetching leaderboard:", error.response?.data);
        throw new Error(
            error.response?.data?.message || "Failed to fetch leaderboard."
        );
    }
};

/**
 * Fetch the game log (match history) for a group.
 * @param groupId - The ID of the group.
 * @param token - The authentication token.
 * @returns List of matches.
 */
export const fetchGameLogAPI = async (
    groupId: number,
    token: string
): Promise<Match[]> => {
    try {
        const response = await apiClient.get(`/${groupId}/gamelog`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error fetching game log:", error.response?.data);
        throw new Error(
            error.response?.data?.message || "Failed to fetch game log."
        );
    }
};

/**
 * Post a new match result.
 * @param groupId - The ID of the group.
 * @param winnerId - The ID of the winner.
 * @param loserId - The ID of the loser.
 * @param ballsLeft - (Optional) Number of balls left.
 * @param token - The authentication token.
 * @returns The created match object.
 */
export const postMatchAPI = async (
    groupId: number,
    winnerId: number,
    loserId: number,
    ballsLeft: number | null,
    token: string
): Promise<Match> => {
    try {
        console.log("Posting match:", groupId, winnerId, loserId, ballsLeft);
        const response = await apiClient.post(
            `/${groupId}/match`,
            { groupId, winnerId, loserId, ballsLeft },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Match response:", response.data);
        return response.data.match;
    } catch (error: any) {
        console.error("Error posting match:", error.response?.data);
        throw new Error(
            error.response?.data?.message || "Failed to post match."
        );
    }
};
