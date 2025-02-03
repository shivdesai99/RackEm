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
            duration: 1000,
            isClosable: true,
            position: "top",
            containerStyle: { paddingTop: "20rem" },
        });
        navigate(`/groups/${user.id}`);
    };

    return (
        <Box
            minH="100vh"
            bg="background"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={{ base: 4, md: 8 }}
        >
            <VStack
                spacing={{ base: 6, md: 8 }}
                w="full"
                maxW={{ base: "95%", sm: "90%", md: "80%" }}
                px={{ base: 4, md: 8 }}
                textAlign="center"
            >
                <Header />
                <LoginForm onLoginSuccess={handleLoginSuccess} />
                <VStack spacing={{ base: 4, md: 6 }}>
                    <Text
                        fontSize={{ base: "md", md: "lg" }}
                        color="textSecondary"
                    >
                        Test Change
                    </Text>
                    <Button
                        variant="link"
                        fontSize={{ base: "lg", md: "xl" }}
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
