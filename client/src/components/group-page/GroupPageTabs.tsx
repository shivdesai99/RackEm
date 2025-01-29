import React, { useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Box,
    Spinner,
} from "@chakra-ui/react";
import LeaderboardList from "./LeaderboardList";
import GameLogList from "./GameLogList";
import useGroupPage from "@/hooks/useGroupPage";

const GroupPageTabs: React.FC = () => {
    const { group_id } = useParams<{ group_id: string }>(); // Get groupId from URL
    const { leaderboard, gameLog, loading, fetchLeaderboard, fetchGameLog } =
        useGroupPage();
    console.log("GroupPageTabs loaded with groupId:", group_id);
    useEffect(() => {
        if (group_id) {
            fetchLeaderboard(Number(group_id)); // Convert to number
            fetchGameLog(Number(group_id));
        }
    }, [fetchLeaderboard, fetchGameLog, group_id]);

    return (
        <Box mt={4} maxW="95%" mx="auto">
            <Tabs variant="soft-rounded" colorScheme="blue">
                <TabList justifyContent="center" mb={4}>
                    <Tab>Leaderboard</Tab>
                    <Tab>Game Log</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {loading ? (
                            <Spinner size="lg" color="white" />
                        ) : (
                            <LeaderboardList leaderboard={leaderboard} />
                        )}
                    </TabPanel>
                    <TabPanel>
                        {loading ? (
                            <Spinner size="lg" color="white" />
                        ) : (
                            <GameLogList gameLog={gameLog} />
                        )}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default GroupPageTabs;
