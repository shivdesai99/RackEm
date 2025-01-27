import React from "react";
import { Box, Text } from "@chakra-ui/react";

const GroupDashBoardTabs: React.FC = () => {
    return (
        <Box
            w="full"
            p={{ base: 4, md: 6 }}
            bg="white"
            borderRadius="lg"
            shadow="subtle"
            maxW={{ base: "full", md: "80%" }}
            mx="auto"
            textAlign="center"
        >
            <Text fontSize="xl" fontWeight="bold">
                Group Dashboard
            </Text>
            <Text>This page is under construction.</Text>
        </Box>
    );
};

export default GroupDashBoardTabs;
