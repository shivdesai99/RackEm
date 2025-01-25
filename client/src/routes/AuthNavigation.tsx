import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginScreen from "@/pages/auth/LoginScreen";
import SignUpScreen from "@/pages/auth/SignUpScreen";

const AuthNavigation: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
        </Routes>
    );
};

export default AuthNavigation;
