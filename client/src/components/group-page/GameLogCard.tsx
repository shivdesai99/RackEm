import React from "react";
import { Box, Text, HStack, Spacer } from "@chakra-ui/react";
import { Match } from "@/types/models/Match";

interface GameLogCardProps {
    match: Match;
    matchNumber: number;
}

const GameLogCard: React.FC<GameLogCardProps> = ({ match, matchNumber }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    // Randomly swap player order for visual variation
    const players =
        Math.random() > 0.5
            ? `${match.winner_name} vs. ${match.loser_name}`
            : `${match.loser_name} vs. ${match.winner_name}`;

    return (
        <Box
            bg="whiteAlpha.900"
            p={5}
            borderRadius="md"
            boxShadow="sm"
            w="100%"
            maxW="700px"
            mx="auto"
            mb={2}
        >
            <HStack spacing={3} justifyContent="space-between">
                {/* Match Number */}
                <Text fontWeight="bold" color="gray.700">
                    Match #{matchNumber}
                </Text>

                {/* Players */}
                <Text fontSize="md" color="gray.800">
                    {players}
                </Text>

                {/* Winner */}
                {/* Add a slight seperate between players names and result */}
                <Spacer />
                <Text fontSize="md" color="green.300" fontWeight="bold">
                    <Text as="span" mr={3}>
                        {match.winner_name}
                    </Text>
                    🏆{" "}
                </Text>

                {/* Balls Left (only if applicable) */}
                {match.balls_left !== null && (
                    <Text fontSize="sm" color="gray.500">
                        Balls Left: {match.balls_left}
                    </Text>
                )}

                <Spacer />

                {/* Match Date */}
                <Text fontSize="xs" color="gray.500">
                    {formatDate(match.date_posted)}
                </Text>
            </HStack>
        </Box>
    );
};

export default GameLogCard;
