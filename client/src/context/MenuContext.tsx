import React, { createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface MenuContextProps {
    navigateToProfile: () => void;
    navigateToGroupDashboard: () => void;
    navigateToChangeGroup: () => void;
    logout: () => void;
    isMenuOpen: boolean;
    toggleMenu: () => void;
    closeMenu: () => void;
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export const MenuProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { logout: authLogout } = useAuth();

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const navigateToProfile = () => {
        closeMenu();
        // Navigate to the Profile Page
        navigate("/profile");
        // TODO: Build the Profile Page to show user stats (total games, wins, losses, etc.).
        // Relies on user data fetched from the backend or AuthContext.
    };

    const navigateToGroupDashboard = () => {
        closeMenu();
        // Navigate to the Group Dashboard (default to Leaderboard tab)
        navigate(`/group-dashboard/:group_id`);
        // TODO: Implement Group Dashboard with tabs for Leaderboard and Game Log.
        // Relies on APIs for fetching leaderboard data and match history.
    };

    const navigateToChangeGroup = () => {
        closeMenu();
        // Navigate back to the Groups Page
        navigate("/groups/:user_id");
        // TODO: Ensure Groups Page allows selecting/joining new groups.
        // This relies on GroupsContext for managing group data.
    };

    const logout = () => {
        closeMenu();
        // TODO: Use AuthContext to handle logout logic (clear token, user data, and localStorage).
        // Redirect to the Login Page after logout

        authLogout();
        navigate("/login");
    };

    return (
        <MenuContext.Provider
            value={{
                navigateToProfile,
                navigateToGroupDashboard,
                navigateToChangeGroup,
                logout,
                isMenuOpen,
                toggleMenu,
                closeMenu,
            }}
        >
            {children}
        </MenuContext.Provider>
    );
};

export default MenuContext;
