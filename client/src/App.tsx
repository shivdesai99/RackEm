import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import AppRoutes from "@/routes/AppRoutes";
import { AuthProvider } from "@/context/AuthContext";
import theme from "@/styles/theme";

const App: React.FC = () => {
    return (
        <ChakraProvider theme={theme}>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </ChakraProvider>
    );
};

export default App;
