import React from "react";
import { Box, Text, Flex, Badge } from "@chakra-ui/react";
import { Match } from "@/types/models/Match";

interface GameLogCardProps {
    match: Match;
    matchNumber: number;
}

const GameLogCard: React.FC<GameLogCardProps> = ({ match, matchNumber }) => {
    const formattedDate = new Date(match.date_posted).toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric",
        }
    );

    return (
        <Box
            bg="whiteAlpha.900"
            p={{ base: 2, md: 3 }}
            borderRadius="md"
            shadow="sm"
            mb={2}
        >
            <Flex
                align="center"
                gap={{ base: 2, md: 4 }}
                wrap="nowrap"
                minH="40px"
            >
                <Text
                    fontSize="sm"
                    fontWeight="bold"
                    color="gray"
                    minW={8}
                    flexShrink={0}
                >
                    #{matchNumber}
                </Text>

                <Flex align="center" minW={0}>
                    <Text
                        fontSize={{ base: "md", md: "md" }}
                        color="green.400"
                        fontWeight="bold"
                        isTruncated
                    >
                        {match.winner_name.split(" ")[0]}
                    </Text>
                </Flex>

                <Text color="balck" fontSize="xs" fontWeight="bold">
                    vs
                </Text>

                <Text
                    fontSize={{ base: "md", md: "md" }}
                    color="red.500"
                    fontWeight="bold"
                    isTruncated
                    flex={1}
                    minW={0}
                >
                    {match.loser_name.split(" ")[0]}
                </Text>

                {match.balls_left !== null && (
                    <Badge colorScheme="blue" variant="subtle">
                        🎱 {match.balls_left}
                    </Badge>
                )}

                <Text
                    fontSize={{ base: "xs", md: "sm" }}
                    color="gray.500"
                    minW={14}
                    flexShrink={0}
                    ml="auto"
                >
                    {formattedDate}
                </Text>
            </Flex>
        </Box>
    );
};

export default GameLogCard;
