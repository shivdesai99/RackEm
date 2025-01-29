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
 * Search for users in a group by name.
 * @param groupId - The ID of the group.
 * @param name - The partial or full name to search for.
 * @param token - The authentication token.
 * @returns A list of matching users with their IDs and names.
 */
export const searchUsersInGroupAPI = async (
    groupId: number,
    name: string,
    token: string
): Promise<{ user_id: number; name: string; email: string }[]> => {
    try {
        const response = await apiClient.get("/users/search", {
            headers: { Authorization: `Bearer ${token}` },
            params: { groupId, name },
        });
        return response.data;
    } catch (error: any) {
        console.error(
            "Error searching for users in group:",
            error.response?.data
        );
        throw new Error(
            error.response?.data?.message || "Failed to search for users."
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
        const response = await apiClient.post(
            `/${groupId}/match`,
            { groupId, winnerId, loserId, ballsLeft },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data.match;
    } catch (error: any) {
        console.error("Error posting match:", error.response?.data);
        throw new Error(
            error.response?.data?.message || "Failed to post match."
        );
    }
};
