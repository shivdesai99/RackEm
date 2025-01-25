// Path: src/pages/auth/SignUpScreen.tsx
import React from "react";
import { Box, Button, Text, useToast, VStack } from "@chakra-ui/react";
import SignUpForm from "@/components/forms/SignUpForm";
import Header from "@/components/ui/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const SignUpScreen: React.FC = () => {
    const navigate = useNavigate();
    const { setUser, setToken } = useAuth();
    const toast = useToast();

    const handleSignUpSuccess = (
        token: string,
        user: { id: number; name: string; email: string }
    ) => {
        setToken(token);
        setUser(user);
        toast({
            title: "Sign Up Successful",
            description: "Your account has been created.",
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
                <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
                <VStack spacing="4">
                    <Text color="textSecondary">Already have an account?</Text>
                    <Button
                        variant="link"
                        color="primary"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </Button>
                </VStack>
            </VStack>
        </Box>
    );
};

export default SignUpScreen;
