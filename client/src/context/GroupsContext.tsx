import React, {
    createContext,
    useState,
    useEffect,
    ReactNode,
    useCallback,
} from "react";
import { fetchGroupsAPI, fetchAllGroupsAPI, joinGroupAPI } from "@/api/groups";
import { useAuth } from "@/hooks/useAuth";
import { handleError } from "@/utils/handleError";
import { Group } from "@/types/models/Group";

interface GroupsContextProps {
    myGroups: Group[];
    allGroups: Group[];
    fetchMyGroups: () => Promise<void>;
    fetchAllGroups: () => Promise<void>;
    joinGroup: (groupId: number, joinCode: string) => Promise<void>;
    loading: boolean;
}

const GroupsContext = createContext<GroupsContextProps | undefined>(undefined);

export const GroupsProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [myGroups, setMyGroups] = useState<Group[]>([]);
    const [allGroups, setAllGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { token, user } = useAuth();

    const fetchMyGroups = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        try {
            const fetchedGroups = await fetchGroupsAPI(token);
            console.log("My Groups from GroupContext:", fetchedGroups);
            setMyGroups(fetchedGroups);
        } catch (error) {
            console.error("Failed to fetch groups:", error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    const fetchAllGroups = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        try {
            const allGroups = await fetchAllGroupsAPI(token);
            console.log("All Groups from GroupContext:", allGroups);
            setAllGroups(allGroups);
        } catch (error) {
            console.error("Failed to fetch all groups:", error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    // Join a Group
    const joinGroup = async (groupId: number, joinCode: string) => {
        if (!token) return;
        setLoading(true);
        try {
            await joinGroupAPI(token, groupId, joinCode);
            console.log("Successfully joined the group!");
            await fetchMyGroups();
            await fetchAllGroups();
        } catch (error: any) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch Data After Login
    useEffect(() => {
        const fetchData = async () => {
            if (token && user) {
                await Promise.all([fetchMyGroups(), fetchAllGroups()]);
            }
        };
        fetchData();
    }, [token, user, fetchMyGroups, fetchAllGroups]);

    console.log("My Groups from GroupContext:", myGroups);
    console.log("All Groups from GroupContext:", allGroups);
    return (
        <GroupsContext.Provider
            value={{
                myGroups,
                allGroups,
                fetchMyGroups,
                fetchAllGroups,
                joinGroup,
                loading,
            }}
        >
            {children}
        </GroupsContext.Provider>
    );
};

export default GroupsContext;
