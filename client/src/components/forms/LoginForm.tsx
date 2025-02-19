import React, { useState } from "react";
import { Box, Button, Heading, Spinner, VStack, Text } from "@chakra-ui/react";
import FormInput from "@/components/ui/FormInput";
import { loginAPI } from "@/api/auth";

interface LoginFormProps {
    onLoginSuccess: (
        token: string,
        user: { id: number; name: string; email: string }
    ) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setError(null);

        if (!email || !password) {
            setError("Both fields are required.");
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await loginAPI(email, password);
            onLoginSuccess(response.token, response.user);
        } catch (err: any) {
            setError(err.message || "Invalid email or password.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            w={{ base: "90%", sm: "400px" }}
            p={{ base: 4, md: 6 }}
            bg="background"
            borderRadius="lg"
            boxShadow="md"
        >
            <Heading
                as="h2"
                size="lg"
                textAlign="center"
                mb={4}
                color="dark-blue"
            >
                Login
            </Heading>
            <VStack spacing={4} align="center">
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
                    <Text color="red.500" fontSize="md" textAlign="center">
                        {error}
                    </Text>
                )}
                {isLoading ? (
                    <Spinner size="lg" color="dark-blue" />
                ) : (
                    <Button
                        w="full"
                        colorScheme="blue"
                        bg="dark-blue"
                        _hover={{ bg: "mid-blue" }}
                        size="lg"
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                )}
            </VStack>
        </Box>
    );
};

export default LoginForm;
