import React, { useEffect, useState } from "react";
import { Box, Text, VStack, Spinner } from "@chakra-ui/react";
import GroupPageTabs from "@/pages/group-dashboard/GroupPageTabs";
import MenuIcon from "@/components/menu/MenuIcon";
import DropdownMenu from "@/components/menu/DropdownMenu";
import useGroupPage from "@/hooks/useGroupPage";
import { useParams } from "react-router-dom";
import PostMatchButton from "@/components/group-page/PostMatchButton";
import PostMatchModal from "@/components/modals/PostMatchModal"; // Added Modal Import

const GroupHomePage: React.FC = () => {
    const { group, loading, fetchGroupData } = useGroupPage();
    const { group_id } = useParams<{ group_id: string }>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchGroupData(Number(group_id));
    }, [fetchGroupData, group_id]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={14}
            h="80vh"
            bg="#1E2A47" // Darker Navy for a more modern feel
            pl={16}
            pr={16}
            marginBottom={32}
            marginTop={32}
        >
            <MenuIcon />
            <DropdownMenu />

            <VStack spacing={2} align="center" mt={8}>
                {loading ? (
                    <Spinner size="lg" color="white" />
                ) : (
                    <Text
                        fontSize="5xl"
                        fontWeight="bold"
                        color="white"
                        fontFamily="Georgia"
                        textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
                    >
                        {group?.name || "Group Name"}
                    </Text>
                )}
            </VStack>

            <Box
                flex={1}
                mt={4}
                mb={4}
                bg="whiteAlpha.900"
                borderRadius="lg"
                boxShadow="md"
                overflow="auto"
                maxH="50vh"
            >
                <GroupPageTabs />
            </Box>

            <Box textAlign="center" position="relative" bottom={15}>
                <PostMatchButton onOpen={() => setIsModalOpen(true)} />
            </Box>

            {/* Post Match Modal */}
            <PostMatchModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                groupId={Number(group_id)}
            />
        </Box>
    );
};

export default GroupHomePage;
