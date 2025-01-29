import React from "react";
import { Box, Text, VStack, HStack, Divider } from "@chakra-ui/react";
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

    return (
        <Box
            bg="white"
            p={4}
            borderRadius="lg"
            boxShadow="subtle"
            mb={4}
            transition="transform 0.2s ease-in-out"
            _hover={{
                transform: "scale(.99)",
            }}
        >
            <HStack justifyContent="space-between" mb={2}>
                <Text fontWeight="bold" fontSize="lg" color="dark-blue">
                    Match #{matchNumber}
                </Text>
                <Text fontSize="sm" color="white">
                    {formatDate(match.date_posted)}
                </Text>
            </HStack>
            <Divider />
            <VStack align="start" spacing={2} mt={2}>
                <Text color="black">
                    <strong>Winner:</strong> {match.winner_name}
                </Text>
                <Text color="dark-gray">
                    <strong>Loser:</strong> {match.loser_name}
                </Text>
                {match.balls_left !== null && (
                    <Text color="black">
                        <strong>Balls Left:</strong> {match.balls_left}
                    </Text>
                )}
            </VStack>
        </Box>
    );
};

export default GameLogCard;
