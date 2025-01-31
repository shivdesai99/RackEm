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
        navigate("/profile");
    };

    const navigateToGroupDashboard = () => {
        closeMenu();
        navigate(`/group-dashboard/:group_id`);
    };

    const navigateToChangeGroup = () => {
        closeMenu();
        navigate("/groups/:user_id");
    };

    const logout = () => {
        closeMenu();
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
