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
        <Box maxW="90%" mx="auto" h="65vh" overflowY="auto">
            <VStack align="stretch">
                {gameLog
                    .slice()
                    .sort(
                        (a, b) =>
                            new Date(b.date_posted).getTime() -
                            new Date(a.date_posted).getTime()
                    )
                    .map((match, index) => (
                        <GameLogCard
                            key={match.match_id}
                            match={match}
                            matchNumber={gameLog.length - index}
                        />
                    ))}
            </VStack>
        </Box>
    );
};

export default GameLogList;
