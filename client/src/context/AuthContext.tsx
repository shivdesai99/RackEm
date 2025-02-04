import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { verifyTokenAPI } from "@/api/auth";
import { User } from "@/types/models/User";

export interface AuthContextProps {
    user: User | null;
    token: string | null;
    loading: boolean;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const isSessionRestored = React.useRef(false);

    const logout = async () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("authTokenExpiry");
        navigate("/login");
    };

    useEffect(() => {
        if (isSessionRestored.current) return;
        isSessionRestored.current = true;

        const restoreSession = async () => {
            try {
                console.log("Trying restoreSession");
                const storedToken = localStorage.getItem("authToken");
                const expiry = localStorage.getItem("authTokenExpiry");

                if (!storedToken || !expiry) {
                    throw new Error("No valid session found.");
                }

                const expiryTime = parseInt(expiry, 10);
                const currentTime = Math.floor(Date.now() / 1000);

                if (expiryTime < currentTime) {
                    console.warn("Stored token has expired. Logging out.");
                    logout();
                    navigate("/login");
                    return;
                }

                const userData = await verifyTokenAPI(storedToken);
                setToken(storedToken);
                setUser(userData);

                navigate(`/groups/${userData.id}`);
            } catch (error) {
                console.error("Session restoration failed:", error);
                logout();
            } finally {
                setLoading(false);
            }
        };

        restoreSession();
    }, [logout]);

    return (
        <AuthContext.Provider
            value={{ user, token, loading, setUser, setToken, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
