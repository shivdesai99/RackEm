import React, { useEffect } from "react";
import { Box, Text, VStack, Spinner } from "@chakra-ui/react";
import GroupPageTabs from "@/components/group-page/GroupPageTabs";
import MenuIcon from "@/components/menu/MenuIcon";
import DropdownMenu from "@/components/menu/DropdownMenu";
import useGroupPage from "@/hooks/useGroupPage";

const GroupHomePage: React.FC = () => {
    const { group, loading, fetchGroupData } = useGroupPage();

    // Replace with dynamic groupId
    const groupId = 1;

    useEffect(() => {
        fetchGroupData(groupId);
    }, [fetchGroupData, groupId]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={12}
            h="77vh"
            bg="dark-blue"
            py={8}
            pl={32} // Left safe area
            pr={32} // Right safe area
            marginBottom={32} // Bottom safe area
            marginTop={32} // Offset for safe areas
        >
            {/* Menu Icon & Dropdown Menu */}
            <MenuIcon />
            <DropdownMenu />

            {/* Group Name */}
            <VStack spacing={2} align="center" mt={8}>
                {loading ? (
                    <Spinner size="lg" color="white" />
                ) : (
                    <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        color="white"
                        textAlign="center"
                    >
                        {group?.name || "Group Name"}
                    </Text>
                )}
            </VStack>

            {/* Tabs for Leaderboard and Game Log */}
            <Box
                flex={1}
                mt={4}
                mb={4}
                bg="light-blue"
                borderRadius="lg"
                boxShadow="subtle"
                overflow="hidden"
                maxH="60vh" // Restrict height to avoid overflow
            >
                <GroupPageTabs />
            </Box>

            {/* Placeholder for Post Match Button */}
            <Box
                bg="gray"
                py={3}
                textAlign="center"
                borderRadius="md"
                boxShadow="medium"
                position="relative"
                bottom={0}
            >
                <Text fontSize="lg" fontWeight="medium" color="white">
                    Post Match Button (Coming Soon)
                </Text>
            </Box>
        </Box>
    );
};

export default GroupHomePage;
