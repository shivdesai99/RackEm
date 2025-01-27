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
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setSelectedGroup(group);
        setIsModalOpen(true);
    };

    const handleJoinGroup = async (groupId: number, joinCode: string) => {
        try {
            await joinGroup(groupId, joinCode);
            toast({
                title: "Group joined successfully!",
                description: `You have successfully joined the group.`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setIsModalOpen(false);
        } catch (error: any) {
            toast({
                title: "Error joining group",
                description:
                    error.message ||
                    "Failed to join the group. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
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
