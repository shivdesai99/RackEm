import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "@/pages/auth/LoginScreen";
import SignUpScreen from "@/pages/auth/SignUpScreen";

import { GroupsProvider } from "@/context/GroupsContext";
import GroupTabs from "@/components/groups/GroupTabs";
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
                        <GroupsProvider>
                            <GroupTabs />
                        </GroupsProvider>
                    </PrivateRoute>
                }
            />

            {/* Catch-All Redirect */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};

export default AppRoutes;
