import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "@/pages/auth/LoginScreen";
import SignUpScreen from "@/pages/auth/SignUpScreen";

import { GroupsProvider } from "@/context/GroupsContext";
import GroupTabs from "@/pages/groups/GroupTabs";
import { useAuth } from "@/hooks/useAuth";
import GroupHomePage from "@/pages/group-dashboard/GroupDashboardTabs";

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
                        <GroupsProvider>
                            <GroupTabs />
                        </GroupsProvider>
                    </PrivateRoute>
                }
            />
            <Route
                path="/group-dashboard/:group_id" // Add the group-dashboard route
                element={
                    <PrivateRoute>
                        <GroupHomePage />
                    </PrivateRoute>
                }
            />

            {/* Catch-All Redirect */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};

export default AppRoutes;
