import React from "react";
import { Box, VStack, Text } from "@chakra-ui/react";
import GameLogCard from "@/components/group-page/GameLogCard";
import { Match } from "@/types/models/Match";

interface GameLogListProps {
    gameLog: Match[];
}

const GameLogList: React.FC<GameLogListProps> = ({ gameLog }) => {
    if (gameLog.length === 0) {
        return (
            <Box textAlign="center" mt={8}>
                <Text fontSize="lg" color="gray">
                    No matches have been played yet.
                </Text>
            </Box>
        );
    }

    return (
        <Box
            maxW="90%" // Reduced width for better spacing
            mx="auto"
            h="65vh" // Restrict height for scrolling
            overflowY="auto" // Enable scrolling
        >
            <VStack spacing={4} align="stretch">
                {gameLog
                    .slice()
                    .reverse() // Reverse order so the latest match is at the bottom
                    .map((match, index, arr) => (
                        <GameLogCard
                            key={match.match_id}
                            match={match}
                            matchNumber={arr.length - index} // Ensuring latest matches get the highest number
                        />
                    ))}
            </VStack>
        </Box>
    );
};

export default GameLogList;
