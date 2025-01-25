// Path: src/pages/auth/LoginScreen.tsx
import React from "react";
import { Box, Button, Text, useToast, VStack } from "@chakra-ui/react";
import LoginForm from "@/components/forms/LoginForm";
import Header from "@/components/ui/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const LoginScreen: React.FC = () => {
    const navigate = useNavigate();
    const { setUser, setToken } = useAuth();
    const toast = useToast();

    const handleLoginSuccess = (
        token: string,
        user: { id: number; name: string; email: string }
    ) => {
        setToken(token);
        setUser(user);
        toast({
            title: "Login Successful",
            description: "You have successfully logged in.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        navigate("/groups");
    };

    return (
        <Box
            minH="100vh"
            bg="background"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p="4"
        >
            <VStack spacing="8" w="full" maxW="md" textAlign="center">
                <Header />
                <LoginForm onLoginSuccess={handleLoginSuccess} />
                <VStack spacing="4">
                    <Text color="textSecondary">Don't have an account?</Text>
                    <Button
                        variant="link"
                        color="primary"
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </Button>
                </VStack>
            </VStack>
        </Box>
    );
};

export default LoginScreen;
