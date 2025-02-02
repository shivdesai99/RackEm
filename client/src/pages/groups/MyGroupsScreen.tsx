import React from "react";
import { Box } from "@chakra-ui/react";
import { useGroups } from "@/hooks/useGroups";
import GroupList from "@/components/groups/GroupList";
import { useNavigate } from "react-router-dom";
import { Group } from "@/types/models/Group";

const MyGroupsScreen: React.FC = () => {
    const { myGroups } = useGroups();
    // console.log("My Groups loaded into MyGroupsScreen:", myGroups);
    const navigate = useNavigate();

    const navigateToGroupDashboard = (group: Group) => {
        navigate(`/group-dashboard/${group.id}`);
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
                groups={myGroups}
                onCardClick={navigateToGroupDashboard}
                isJoined={true}
            />
        </Box>
    );
};

export default MyGroupsScreen;
