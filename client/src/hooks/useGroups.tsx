import { useContext } from "react";
import GroupsContext from "@/context/GroupsContext";

export const useGroups = () => {
    const context = useContext(GroupsContext);
    if (!context) {
        throw new Error("useGroups must be used within a GroupsProvider");
    }
    return context;
};
