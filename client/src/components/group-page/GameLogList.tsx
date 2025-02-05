import React from "react";
import { Box, VStack, Text } from "@chakra-ui/react";
import GameLogCard from "@/components/group-page/GameLogCard";
import { Match } from "@/types/models/Match";

interface GameLogListProps {
    gameLog: Match[];
}

const GameLogList: React.FC<GameLogListProps> = ({ gameLog }) => {
    if (!gameLog.length) {
        return (
            <Box textAlign="center" mt={8}>
                <Text fontSize="lg" color="gray">
                    No matches have been played yet.
                </Text>
            </Box>
        );
    }

    return (
        <Box w="full" h="75vh" overflowY="auto">
            <VStack align="stretch" w="full">
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
