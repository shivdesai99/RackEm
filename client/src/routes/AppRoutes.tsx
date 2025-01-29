import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "@/pages/auth/LoginScreen";
import SignUpScreen from "@/pages/auth/SignUpScreen";

import { GroupsProvider } from "@/context/GroupsContext";
import { MenuProvider } from "@/context/MenuContext";
import { GroupPageProvider } from "@/context/GroupPageContext";
import GroupTabs from "@/pages/groups/GroupTabs";
import GroupHomePage from "@/pages/group-dashboard/GroupHomePage";
import ProfilePage from "@/pages/profile/ProfilePage";
import { useAuth } from "@/hooks/useAuth";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" replace />;
};

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Unauthenticated Routes */}
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />

            {/* Authenticated Routes */}
            <Route
                path="/groups/:user_id"
                element={
                    <PrivateRoute>
                        <MenuProvider>
                            <GroupsProvider>
                                <GroupTabs />
                            </GroupsProvider>
                        </MenuProvider>
                    </PrivateRoute>
                }
            />
            <Route
                path="/group-dashboard/:group_id"
                element={
                    <PrivateRoute>
                        <MenuProvider>
                            <GroupPageProvider>
                                <GroupHomePage />
                            </GroupPageProvider>
                        </MenuProvider>
                    </PrivateRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <PrivateRoute>
                        <MenuProvider>
                            <ProfilePage />
                            {/* TO-DO: ProfilePage should display user statistics like total games, wins, losses, etc. */}
                        </MenuProvider>
                    </PrivateRoute>
                }
            />

            {/* Catch-All Redirect */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};

export default AppRoutes;
