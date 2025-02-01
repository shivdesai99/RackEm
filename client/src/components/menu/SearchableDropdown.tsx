import React, { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import useGroupPage from "@/hooks/useGroupPage";

interface User {
    user_id: number;
    name: string;
}

interface SearchableDropdownProps {
    groupId: number;
    placeholder: string;
    onSelect: (user: User | null) => void;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
    groupId,
    placeholder,
    onSelect,
}) => {
    const { searchUsers } = useGroupPage();
    const [allUsers, setAllUsers] = useState<
        { value: number; label: string }[]
    >([]);
    const [loaded, setLoaded] = useState(false);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const users = await searchUsers(groupId, "");
                setAllUsers(
                    users.map((user: User) => ({
                        value: user.user_id,
                        label: user.name,
                    }))
                );
                setLoaded(true);
            } catch (error) {
                console.error("Error fetching all users:", error);
            }
        };

        fetchAllUsers();
    }, [groupId, searchUsers]);

    const loadOptions = async (inputValue: string) => {
        if (!loaded) return [];
        if (!inputValue.trim()) return allUsers;

        try {
            const filteredUsers = allUsers.filter((user) =>
                user.label.toLowerCase().includes(inputValue.toLowerCase())
            );
            return filteredUsers;
        } catch (error) {
            console.error("Error filtering users:", error);
            return [];
        }
    };

    return (
        <AsyncSelect
            cacheOptions
            loadOptions={loadOptions}
            defaultOptions={allUsers}
            placeholder={placeholder}
            value={inputValue ? { value: 0, label: inputValue } : null}
            onInputChange={(newValue, { action }) => {
                if (action === "input-change") {
                    setInputValue(newValue);
                }
            }}
            onChange={(selectedOption) => {
                if (selectedOption) {
                    setInputValue(selectedOption.label);
                    onSelect({
                        user_id: selectedOption.value,
                        name: selectedOption.label,
                    });
                } else {
                    setInputValue("");
                    onSelect(null);
                }
            }}
            styles={{
                control: (base) => ({
                    ...base,
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "8px",
                    border: "1px solid white",
                }),
                menu: (base) => ({
                    ...base,
                    backgroundColor: "black",
                }),
                option: (base, { isFocused }) => ({
                    ...base,
                    backgroundColor: isFocused ? "gray" : "black",
                    color: "white",
                }),
                singleValue: (base) => ({
                    ...base,
                    color: "white",
                }),
                input: (base) => ({
                    ...base,
                    color: "white",
                }),
                placeholder: (base) => ({
                    ...base,
                    color: "white",
                }),
            }}
        />
    );
};

export default SearchableDropdown;
