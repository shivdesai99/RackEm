import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:5001/auth",
    headers: {
        "Content-Type": "application/json",
    },
});

export const loginAPI = async (email: string, password: string) => {
    try {
        const response = await apiClient.post("/login", { email, password });
        sessionStorage.setItem("authToken", response.data.token);
        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
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
        sessionStorage.setItem("authToken", response.data.token);
        return response.data;
    } catch (error: any) {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
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
        throw new Error(error.message && "Token verification failed.");
    }
};
