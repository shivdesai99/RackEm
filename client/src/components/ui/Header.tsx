import React from "react";
import { Heading } from "@chakra-ui/react";

interface HeaderProps {
    title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "RackEm" }) => {
    return (
        <Heading
            color="primary"
            size="2xl"
            textAlign="center"
            mb="8"
            data-testid="header"
        >
            {title}
        </Heading>
    );
};

export default Header;
