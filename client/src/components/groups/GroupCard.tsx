import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { Group } from "@/types/models/Group";

interface GroupCardProps {
    group: Group;
    onClick: (group: Group) => void;
}

const GroupCard: React.FC<GroupCardProps> = ({ group, onClick }) => {
    const handleCardClick = () => {
        onClick(group);
    };

    // console.log(
    //     "Rendering GroupCard:",
    //     group,
    //     "with member count:",
    //     group.memberCount
    // );

    return (
        <Box
            onClick={handleCardClick}
            bg="white"
            p={{ base: 4, md: 6 }}
            borderRadius="lg"
            shadow="subtle"
            cursor="pointer"
            transition="transform 0.2s ease, background 0.2s ease"
            _hover={{
                bg: "mid-blue",
                color: "white",
                transform: "scale(1.03)",
            }}
            _active={{
                bg: "dark-blue",
                transform: "scale(0.98)",
            }}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            maxW="sm"
            mx="auto"
        >
            <VStack align="start" spacing={1}>
                <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
                    {group.name}
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }} color="black">
                    {group.memberCount !== undefined
                        ? `${group.memberCount} ${
                              group.memberCount === 1 ? "member" : "members"
                          }`
                        : "Member count unavailable"}
                </Text>
            </VStack>
        </Box>
    );
};

export default GroupCard;
