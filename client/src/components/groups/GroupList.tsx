import React from "react";
import { Box, SimpleGrid, Text, VStack, Icon } from "@chakra-ui/react";
import { FiFolder } from "react-icons/fi";
import GroupCard from "@/components/groups/GroupCard";
import { Group } from "@/types/models/Group";

interface GroupListProps {
    groups: Group[];
    onCardClick: (group: Group) => void;
    isJoined: boolean; // True for "My Groups", false for "Available Groups"
}

const GroupList: React.FC<GroupListProps> = ({
    groups,
    onCardClick,
    isJoined,
}) => {
    return (
        <Box
            bg="light-blue"
            p={{ base: 4, md: 6 }}
            borderRadius="lg"
            shadow="subtle"
            overflowY="auto"
            maxH={{ base: "70vh", md: "80vh" }}
        >
            {groups.length > 0 ? (
                <SimpleGrid
                    minChildWidth={{ base: "200px", sm: "250px" }}
                    spacing={4}
                >
                    {groups.map((group) => (
                        <GroupCard
                            key={group.id}
                            group={group}
                            onClick={onCardClick}
                        />
                    ))}
                </SimpleGrid>
            ) : (
                <VStack spacing={4} justify="center" align="center" h="full">
                    <Icon
                        as={FiFolder}
                        boxSize={{ base: 12, md: 16 }}
                        color="gray"
                    />
                    <Text fontSize={{ base: "md", md: "lg" }} color="white">
                        {isJoined
                            ? "You haven't joined any groups yet. Start by joining one!"
                            : "No available groups to display. Please check back later."}
                    </Text>
                </VStack>
            )}
        </Box>
    );
};

export default GroupList;
