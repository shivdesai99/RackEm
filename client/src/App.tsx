import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import AuthNavigation from "@/routes/AuthNavigation";
import { AuthProvider } from "@/context/AuthContext";
import theme from "@/styles/theme";

const App: React.FC = () => {
    return (
        <ChakraProvider theme={theme}>
            <AuthProvider>
                <AuthNavigation />
            </AuthProvider>
        </ChakraProvider>
    );
};

export default App;
