import axios from "axios";
import { jwtDecode } from "jwt-decode";

const apiClient = axios.create({
    baseURL: "http://localhost:5001/auth",
    headers: {
        "Content-Type": "application/json",
    },
});

const storeToken = (token: string) => {
    try {
        const decoded = jwtDecode<{ exp?: number }>(token);

        if (!decoded.exp) {
            throw new Error("Token does not have an expiration time.");
        }

        localStorage.setItem("authToken", token);
        localStorage.setItem("authTokenExpiry", decoded.exp.toString());
    } catch (error) {
        console.error("Error decoding token:", error);
    }
};

export const loginAPI = async (email: string, password: string) => {
    try {
        const response = await apiClient.post("/login", { email, password });

        if (response.data.token) {
            storeToken(response.data.token);
        }

        return response.data;
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("An unexpected error occurred. Please try again.");
    }
};

export const registerAPI = async (
    email: string,
    password: string,
    name: string
) => {
    try {
        const response = await apiClient.post("/register", {
            email,
            password,
            name,
        });

        if (response.data.token) {
            storeToken(response.data.token);
        }

        return response.data;
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("An unexpected error occurred. Please try again.");
    }
};

export const verifyTokenAPI = async (token: string) => {
    try {
        const response = await apiClient.get("/me", {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        return response.data.user;
    } catch (error: any) {
        throw new Error("Token verification failed.");
    }
};
