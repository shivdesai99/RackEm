import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Box,
    Spinner,
} from "@chakra-ui/react";
import LeaderboardList from "@/components/group-page/LeaderboardList";
import GameLogList from "@/components/group-page/GameLogList";
import useGroupPage from "@/hooks/useGroupPage";

const GroupPageTabs: React.FC = () => {
    const { group_id } = useParams<{ group_id: string }>();
    const { leaderboard, gameLog, loading, fetchLeaderboard, fetchGameLog } =
        useGroupPage();

    useEffect(() => {
        if (group_id) {
            fetchLeaderboard(Number(group_id));
            fetchGameLog(Number(group_id));
        }
    }, [fetchLeaderboard, fetchGameLog, group_id]);

    return (
        <Box mt={4} maxW="100%" mx="auto">
            <Tabs variant="solid-rounded" colorScheme="cyan">
                <TabList justifyContent="center" mb={4}>
                    <Tab _selected={{ bg: "dark-blue", color: "white" }}>
                        Leaderboard
                    </Tab>
                    <Tab _selected={{ bg: "dark-blue", color: "white" }}>
                        Game Log
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {loading ? (
                            <Spinner size="lg" color="gray.600" />
                        ) : (
                            <LeaderboardList leaderboard={leaderboard} />
                        )}
                    </TabPanel>
                    <TabPanel>
                        {loading ? (
                            <Spinner size="lg" color="gray.600" />
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
