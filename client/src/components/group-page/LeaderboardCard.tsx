import React from "react";
import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import { LeaderboardUser } from "@/types/models/LeaderboardUser"; // Ensure this type exists

interface LeaderboardCardProps {
    entry: LeaderboardUser;
    rank: number;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ entry, rank }) => {
    // Calculate win rate dynamically
    const winRate =
        entry.total_matches > 0
            ? ((entry.wins / entry.total_matches) * 100).toFixed(1)
            : "0.0";

    return (
        <Box
            w="full"
            bg="white"
            p={3}
            borderRadius="md"
            shadow="subtle"
            transition="transform 0.2s ease-in-out"
            _hover={{
                transform: "scale(.98)",
            }}
        >
            <HStack justify="space-between" align="center">
                {/* Rank + Name */}
                <HStack spacing={4}>
                    <Text fontSize="lg" fontWeight="bold">
                        #{rank}
                    </Text>
                    <Text fontSize="lg" fontWeight="medium">
                        {entry.name}
                    </Text>
                </HStack>

                {/* Stats */}
                <VStack align="end" spacing={1}>
                    <Text fontSize="md">
                        🏆{" "}
                        <Text as="span" ml={2}>
                            Wins: {entry.wins}
                        </Text>
                    </Text>
                    <Text fontSize="md">
                        ❌{" "}
                        <Text as="span" ml={2}>
                            Losses: {entry.losses}
                        </Text>
                    </Text>
                    <Text fontSize="md">
                        📊{" "}
                        <Text as="span" ml={2}>
                            Win Rate: {winRate}%
                        </Text>
                    </Text>
                </VStack>
            </HStack>
        </Box>
    );
};

export default LeaderboardCard;
