import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import MyGroupsScreen from "@/pages/groups/MyGroupsScreen";
import JoinGroupsScreen from "@/pages/groups/JoinGroupsScreen";

const GroupTabs: React.FC = () => {
    return (
        <Box
            w="full"
            maxW={{ base: "90%", sm: "md", lg: "3xl" }} // Responsive width
            mx="auto"
            bg="white"
            borderRadius="lg"
            shadow="subtle"
            p={{ base: 2, md: 6 }} // Reduced padding for mobile
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            mt={{ base: "8vh", md: "12vh" }} // Adjusted for better mobile positioning
        >
            <Tabs isLazy={false} variant="enclosed-colored" isFitted>
                <TabList
                    borderWidth={{ base: "1px", md: "2px" }} // Adjusted border width for mobile
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
                        py={{ base: 2, md: 3 }} // Adjusted padding for mobile
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
                        py={{ base: 2, md: 3 }} // Adjusted padding for mobile
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
