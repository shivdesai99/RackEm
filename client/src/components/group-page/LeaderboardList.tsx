import React from "react";
import { VStack, Text, Box } from "@chakra-ui/react";
import LeaderboardCard from "@/components/group-page/LeaderboardCard";
import { LeaderboardUser } from "@/types/models/LeaderboardUser";

interface LeaderboardListProps {
    leaderboard: LeaderboardUser[];
}

const LeaderboardList: React.FC<LeaderboardListProps> = ({ leaderboard }) => {
    if (!leaderboard.length) {
        return (
            <Text fontSize="lg" color="gray" textAlign="center">
                No leaderboard data available.
            </Text>
        );
    }

    return (
        <Box maxW="80%" mx="auto" h="65vh" overflowY="auto">
            <VStack align="stretch">
                {leaderboard.map((entry, index) => (
                    <LeaderboardCard
                        key={entry.user_id}
                        entry={entry}
                        rank={index + 1}
                    />
                ))}
            </VStack>
        </Box>
    );
};

export default LeaderboardList;
