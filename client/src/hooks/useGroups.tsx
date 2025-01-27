import { useContext } from "react";
import GroupsContext from "@/context/GroupsContext";

/**
 * Custom hook to access the GroupsContext.
 * Ensures GroupsContext is used within a GroupsProvider.
 * @returns GroupsContext value
 */
export const useGroups = () => {
    const context = useContext(GroupsContext);
    if (!context) {
        throw new Error("useGroups must be used within a GroupsProvider");
    }
    return context;
};
