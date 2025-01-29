import { useContext } from "react";
import GroupPageContext from "@/context/GroupPageContext";

const useGroupPage = () => {
    const context = useContext(GroupPageContext);

    if (!context) {
        throw new Error("useGroupPage must be used within a GroupPageProvider");
    }

    return context;
};

export default useGroupPage;
