import React from "react";
import { Box } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useMenu } from "@/hooks/useMenu";

const MenuIcon: React.FC = () => {
    const { toggleMenu } = useMenu();

    return (
        <Box
            position="absolute"
            top={{ base: 5, md: 4 }}
            right={{ base: 5, md: 4 }}
            zIndex="10"
            boxSize={{ sm: "14", md: "75" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            borderRadius="full"
            _hover={{ bg: "gray" }}
            aria-label="Open Menu"
            onClick={() => {
                console.log("MenuIcon clicked");
                toggleMenu();
            }}
        >
            <HamburgerIcon boxSize={{ sm: 13, md: 55 }} color="white" />
        </Box>
    );
};

export default MenuIcon;
