import React, { useState } from "react";
import { Box, Button, Heading, Spinner, VStack, Text } from "@chakra-ui/react";
import FormInput from "@/components/ui/FormInput";
import { registerAPI } from "@/api/auth";

interface SignUpFormProps {
    onSignUpSuccess: (
        token: string,
        user: { id: number; name: string; email: string }
    ) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUpSuccess }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = async () => {
        setError(null);

        // Basic validation
        if (!name || !email || !password) {
            setError("All fields are required.");
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await registerAPI(email, password, name);
            onSignUpSuccess(response.token, response.user);
        } catch (err: any) {
            setError(err.message || "An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            w="100%" // Ensures full width of the parent container
            maxW="550px" // Caps the maximum width for large screens
            minW="400px" // Sets a minimum width to avoid shrinking too much
            mx="auto" // Centers the form horizontally
            p={{ base: 4, md: 8 }} // Adjusts padding for smaller and larger screens
            bg="surface"
            borderRadius="lg"
            boxShadow="md"
        >
            <Heading
                as="h2"
                size="lg"
                textAlign="center"
                mb={6}
                color="light-blue"
            >
                Sign Up
            </Heading>
            <VStack spacing={4}>
                <FormInput
                    label="Name"
                    value={name}
                    onChange={setName}
                    placeholder="Enter your name"
                    isInvalid={!!error && !name}
                    errorMessage="Name is required"
                />
                <FormInput
                    label="Email"
                    value={email}
                    onChange={setEmail}
                    type="email"
                    placeholder="Enter your email"
                    isInvalid={!!error && !email}
                    errorMessage="Email is required"
                />
                <FormInput
                    label="Password"
                    value={password}
                    onChange={setPassword}
                    type="password"
                    placeholder="Enter your password"
                    isInvalid={!!error && !password}
                    errorMessage="Password is required"
                />
                {error && (
                    <Text color="red.500" fontSize="sm" textAlign="center">
                        {error}
                    </Text>
                )}
                {isLoading ? (
                    <Spinner size="lg" color="light-blue" />
                ) : (
                    <Button
                        w="full"
                        colorScheme="blue"
                        bg="light-blue"
                        _hover={{ bg: "mid-blue" }}
                        size="lg"
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </Button>
                )}
            </VStack>
        </Box>
    );
};

export default SignUpForm;
