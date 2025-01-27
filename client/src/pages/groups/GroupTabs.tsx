import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import MyGroupsScreen from "@/pages/groups/MyGroupsScreen";
import JoinGroupsScreen from "@/pages/groups/JoinGroupsScreen";

const GroupTabs: React.FC = () => {
    return (
        <Box
            w="full"
            maxW="3xl"
            mx="auto"
            bg="white"
            borderRadius="lg"
            shadow="subtle"
            p={{ base: 4, md: 6 }}
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            mt="20vh"
        >
            <Tabs isLazy={false} variant="enclosed-colored" isFitted>
                <TabList
                    borderWidth="2px"
                    borderColor="dark-blue"
                    borderRadius="md"
                    boxShadow="medium"
                    bg="white"
                >
                    <Tab
                        _selected={{
                            bg: "dark-blue",
                            color: "white",
                            boxShadow: "strong",
                        }}
                        _hover={{
                            bg: "mid-blue",
                            color: "white",
                            transition: "all 0.2s ease-in-out",
                        }}
                        fontWeight="bold"
                        py={3}
                    >
                        My Groups
                    </Tab>
                    <Tab
                        _selected={{
                            bg: "dark-blue",
                            color: "white",
                            boxShadow: "strong",
                        }}
                        _hover={{
                            bg: "mid-blue",
                            color: "white",
                            transition: "all 0.2s ease-in-out",
                        }}
                        fontWeight="bold"
                        py={3}
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
