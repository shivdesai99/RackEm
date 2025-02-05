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
            <Box textAlign="center" mt={8}>
                <Text fontSize="lg" color="gray">
                    No leaderboard data available.
                </Text>
            </Box>
        );
    }

    return (
        <Box w="full" h="75vh" overflowY="auto">
            <VStack align="stretch" w="full">
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
