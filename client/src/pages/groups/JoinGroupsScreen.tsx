import React, { useState } from "react";
import { Box, useToast } from "@chakra-ui/react";
import { useGroups } from "@/hooks/useGroups";
import GroupList from "@/components/groups/GroupList";
import AccessCodeModal from "@/components/modals/AccessCodeModal";
import { Group } from "@/types/models/Group";

const JoinGroupsScreen: React.FC = () => {
    const { allGroups, joinGroup, myGroups } = useGroups();
    console.log("All Groups loaded into JoinGroupScreen:", allGroups);
    const toast = useToast();
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const promptAccessCodeModal = (group: Group) => {
        const alreadyJoined = myGroups.some(
            (myGroup) => myGroup.id === group.id
        );
        if (alreadyJoined) {
            toast({
                title: "Already a member",
                description: `You are already a member of the group: ${group.name}`,
                status: "info",
                duration: 1000,
                isClosable: true,
                position: "top",
                containerStyle: { paddingTop: "20rem" },
            });
            return;
        }

        setSelectedGroup(group);
        setIsModalOpen(true);
    };

    const handleJoinGroup = async (groupId: number, joinCode: string) => {
        try {
            await joinGroup(groupId, joinCode);
            setIsModalOpen(false);
        } catch (error: any) {
            // Handle error
            console.error("Failed to join group:", error);
        }
    };

    return (
        <Box
            w="full"
            p={{ base: 4, md: 6 }}
            bg="white"
            borderRadius="lg"
            shadow="subtle"
            maxW={{ base: "full", md: "80%" }}
            mx="auto"
        >
            <GroupList
                groups={allGroups}
                onCardClick={promptAccessCodeModal}
                isJoined={false}
            />
            {selectedGroup && (
                <AccessCodeModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleJoinGroup}
                    group={selectedGroup}
                />
            )}
        </Box>
    );
};

export default JoinGroupsScreen;
