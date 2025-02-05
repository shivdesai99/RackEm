import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL + "/users",
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Search for users in a group by name.
 * @param groupId - The ID of the group.
 * @param name - The partial or full name to search for.
 * @param token - The authentication token.
 * @returns A list of matching users with their IDs and names.
 */
export const searchUsersInGroupAPI = async (
    groupId: number,
    name: string,
    token: string
): Promise<{ user_id: number; name: string; email: string }[]> => {
    try {
        console.log("Searching for users in group:", groupId, name);
        const response = await apiClient.get("/search", {
            headers: { Authorization: `Bearer ${token}` },
            params: { groupId, name },
        });
        console.log("Search response:", response.data);
        return response.data;
    } catch (error: any) {
        console.error(
            "Error searching for users in group:",
            error.response?.data
        );
        throw new Error(
            error.response?.data?.message || "Failed to search for users."
        );
    }
};
