import React from "react";
import { Heading } from "@chakra-ui/react";

interface HeaderProps {
    title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "RackEm" }) => {
    return (
        <Heading
            color="primary"
            fontSize={{ base: "3xl", md: "6xl" }}
            textAlign="center"
            mb={{ base: 6, md: 8 }}
            data-testid="header"
        >
            {title}
        </Heading>
    );
};

export default Header;
