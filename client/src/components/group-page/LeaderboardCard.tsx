import React from "react";
import { Box, Text, Flex, Badge } from "@chakra-ui/react";
import { LeaderboardUser } from "@/types/models/LeaderboardUser";

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
        rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : "";

    return (
        <Box
            bg="white"
            p={{ base: 3, md: 4 }}
            borderRadius="md"
            shadow="subtle"
            mb={2}
            _hover={{ transform: "scale(0.98)" }}
            transition="transform 0.2s"
        >
            <Flex align="center" justify="space-between" gap={3}>
                <Flex align="center" flex={1} minW={0}>
                    <Text
                        fontSize={{ base: "lg", md: "xl" }}
                        fontWeight="bold"
                        color="dark-blue"
                        minW={8}
                    >
                        #{rank}
                    </Text>

                    <Text
                        fontSize={{ base: "lg", md: "md" }}
                        fontWeight="bold"
                        color="dark-blue"
                        ml={3}
                        isTruncated
                    >
                        {entry.name}
                    </Text>
                </Flex>

                {/* Medal */}
                {medal && (
                    <Text fontSize={{ base: "3xl", md: "3xl" }} mx={2}>
                        {medal}
                    </Text>
                )}

                <Flex
                    direction={{ base: "column", md: "row" }}
                    align="flex-end"
                    flexShrink={0}
                    gap={{ base: 0, md: 4 }}
                >
                    <Badge colorScheme="green" variant="subtle">
                        🏆 {entry.wins}
                    </Badge>
                    <Badge colorScheme="red" variant="subtle">
                        ❌ {entry.losses}
                    </Badge>
                    <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color="blackAlpha.700"
                        whiteSpace="nowrap"
                    >
                        {winRate}%
                    </Text>
                </Flex>
            </Flex>
        </Box>
    );
};

export default LeaderboardCard;
