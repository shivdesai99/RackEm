import React from "react";
import { Box, Text } from "@chakra-ui/react";
import MenuIcon from "@/components/menu/MenuIcon";
import DropdownMenu from "@/components/menu/DropdownMenu";
import SafeArea from "@/components/SafeArea";

const GroupHomePage: React.FC = () => {
    return (
        <SafeArea>
            <Box position="relative" w="full" h="100vh" bg="light-blue">
                {/* Menu Icon */}
                <MenuIcon />

                {/* Dropdown Menu */}
                <DropdownMenu />

                {/* Dummy Content for Leaderboard / Game Log */}
                <Box mt={16} textAlign="center">
                    <Text fontSize="xl" color="white">
                        Group Dashboard: Placeholder for Leaderboard and Game
                        Log Tabs
                    </Text>
                </Box>
            </Box>
        </SafeArea>
    );
};

export default GroupHomePage;
