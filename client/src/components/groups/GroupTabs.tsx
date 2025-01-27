import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import MyGroupsScreen from "@/pages/groups/MyGroupsScreen";
import JoinGroupsScreen from "@/pages/groups/JoinGroupsScreen";

const GroupTabs: React.FC = () => {
    return (
        <Box
            w="full"
            maxW="xl"
            mx="auto"
            bg="white"
            borderRadius="lg"
            shadow="subtle"
            p={{ base: 4, md: 6 }}
        >
            <Tabs isLazy={false} variant="enclosed-colored" isFitted>
                <TabList>
                    <Tab
                        _selected={{ bg: "light-blue", color: "white" }}
                        _hover={{ bg: "gray" }}
                    >
                        My Groups
                    </Tab>
                    <Tab
                        _selected={{ bg: "light-blue", color: "white" }}
                        _hover={{ bg: "gray" }}
                    >
                        Join Groups
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <MyGroupsScreen />
                    </TabPanel>
                    <TabPanel>
                        <JoinGroupsScreen />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default GroupTabs;
