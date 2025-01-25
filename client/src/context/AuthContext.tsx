import React, { createContext, useState, useEffect, ReactNode } from "react";
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

    const logout = async () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("authToken");
    };

    useEffect(() => {
        const restoreSession = async () => {
            try {
                const storedToken = localStorage.getItem("authToken");
                if (storedToken) {
                    const userData = await verifyTokenAPI(storedToken);
                    setToken(storedToken);
                    setUser(userData);
                }
            } catch (error) {
                console.error("Session restoration failed:", error);
            } finally {
                setLoading(false);
            }
        };
        restoreSession();
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, token, loading, setUser, setToken, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
