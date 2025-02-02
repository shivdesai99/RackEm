import React, { createContext, useState, ReactNode, useCallback } from "react";
import {
    fetchGroupByIdAPI,
    fetchLeaderboardAPI,
    fetchGameLogAPI,
    postMatchAPI,
} from "@/api/group-page";
import { searchUsersInGroupAPI } from "@/api/users";
import { Group } from "@/types/models/Group";
import { LeaderboardUser } from "@/types/models/LeaderboardUser";
import { Match } from "@/types/models/Match";
import { useAuth } from "@/hooks/useAuth";

interface GroupPageContextProps {
    group: Group | null;
    leaderboard: LeaderboardUser[];
    gameLog: Match[];
    loading: boolean;
    fetchGroupData: (groupId: number) => Promise<void>;
    fetchLeaderboard: (groupId: number) => Promise<void>;
    fetchGameLog: (groupId: number) => Promise<void>;
    searchUsers: (
        groupId: number,
        name: string
    ) => Promise<{ user_id: number; name: string; email: string }[]>;
    postMatchResult: (
        groupId: number,
        winnerId: number,
        loserId: number,
        ballsLeft: number | null
    ) => Promise<void>;
}

const GroupPageContext = createContext<GroupPageContextProps | undefined>(
    undefined
);

export const GroupPageProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [group, setGroup] = useState<Group | null>(null);
    const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
    const [gameLog, setGameLog] = useState<Match[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { token } = useAuth();

    // Fetch group metadata
    const fetchGroupData = useCallback(
        async (groupId: number) => {
            if (!token) return;
            setLoading(true);
            try {
                const groupData = await fetchGroupByIdAPI(groupId, token);
                setGroup(groupData);
            } catch (error) {
                console.error("Failed to fetch group data:", error);
            } finally {
                setLoading(false);
            }
        },
        [token]
    );

    // Fetch leaderboard data
    const fetchLeaderboard = useCallback(
        async (groupId: number) => {
            if (!token) return;
            setLoading(true);
            try {
                const leaderboardData = await fetchLeaderboardAPI(
                    groupId,
                    token
                );
                setLeaderboard(leaderboardData);
            } catch (error) {
                console.error("Failed to fetch leaderboard:", error);
            } finally {
                setLoading(false);
            }
        },
        [token]
    );

    // Fetch game log data
    const fetchGameLog = useCallback(
        async (groupId: number) => {
            if (!token) return;
            setLoading(true);
            try {
                const gameLogData = await fetchGameLogAPI(groupId, token);
                setGameLog(gameLogData);
            } catch (error) {
                console.error("Failed to fetch game log:", error);
            } finally {
                setLoading(false);
            }
        },
        [token]
    );

    // Search users in the group
    const searchUsers = useCallback(
        async (groupId: number, name: string) => {
            if (!token) return [];
            try {
                // console.log("Searching users...");
                const result = await searchUsersInGroupAPI(
                    groupId,
                    name,
                    token
                );
                // console.log("Search users result:", result);
                return result;
            } catch (error) {
                console.error("Failed to search users:", error);
                return [];
            }
        },
        [token]
    );

    // Post a new match result
    const postMatchResult = useCallback(
        async (
            groupId: number,
            winnerId: number,
            loserId: number,
            ballsLeft: number | null
        ) => {
            if (!token) return;
            setLoading(true);
            try {
                // console.log("Posting match result...");
                await postMatchAPI(
                    groupId,
                    winnerId,
                    loserId,
                    ballsLeft,
                    token
                );
                // console.log("Match result posted successfully");
                // Refresh leaderboard and game log after posting match
                // console.log("Refreshing leaderboard...");
                await fetchLeaderboard(groupId);
                // console.log("Refreshing game log...");
                await fetchGameLog(groupId);
            } catch (error) {
                console.error("Failed to post match result:", error);
            } finally {
                setLoading(false);
            }
        },
        [token, fetchLeaderboard, fetchGameLog]
    );

    return (
        <GroupPageContext.Provider
            value={{
                group,
                leaderboard,
                gameLog,
                loading,
                fetchGroupData,
                fetchLeaderboard,
                fetchGameLog,
                searchUsers,
                postMatchResult,
            }}
        >
            {children}
        </GroupPageContext.Provider>
    );
};

export default GroupPageContext;
