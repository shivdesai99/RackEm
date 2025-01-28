import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

const SafeArea: React.FC<BoxProps> = ({ children, ...rest }) => {
    return (
        <Box
            w="100vw"
            h="100vh"
            px={4}
            pt={{ base: "46px", md: "32px" }} // Padding for top spacing
            pb={{ base: "46px", md: "36px" }} // Padding for bottom spacing
            {...rest} // Allows custom props like `bg` to be passed in
        >
            {children}
        </Box>
    );
};

export default SafeArea;
