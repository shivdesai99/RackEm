import React from "react";
import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import { LeaderboardUser } from "@/types/models/LeaderboardUser"; // Ensure this type exists

interface LeaderboardCardProps {
    entry: LeaderboardUser;
    rank: number;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ entry, rank }) => {
    const winRate =
        entry.total_matches > 0
            ? ((entry.wins / entry.total_matches) * 100).toFixed(1)
            : "0.0";

    const medal =
        rank === 1 ? "🏅" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : "";

    const fontSize = rank <= 3 ? "2xl" : "lg";

    return (
        <Box
            w="auto"
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
                <HStack spacing={4}>
                    <Text fontSize={fontSize} fontWeight="bold">
                        #{rank}
                    </Text>

                    {/* Container with fixed width so medals align perfectly */}
                    <HStack spacing={2} minWidth="200px">
                        <Text fontSize={fontSize} fontWeight="medium">
                            {entry.name}
                        </Text>
                    </HStack>

                    {/* Medal with fixed width to ensure alignment */}
                    {medal && (
                        <Text
                            fontSize="5xl"
                            fontWeight="bold"
                            minWidth="40px"
                            textAlign="center"
                        >
                            {medal}
                        </Text>
                    )}
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
