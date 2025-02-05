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
            width="full"
            bg="background"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={{ base: 2, md: 6 }}
        >
            <VStack
                spacing={{ base: 6, md: 8 }}
                w="full"
                maxW="container.sm"
                px={{ base: 2, md: 6 }}
                textAlign="center"
            >
                <Header title="Sign Up" />
                <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
                <VStack spacing={{ base: 4, md: 6 }}>
                    <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
                        Already have an account?
                    </Text>
                    <Button
                        variant="link"
                        fontSize={{ base: "lg", md: "xl" }}
                        color="blue.500"
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
