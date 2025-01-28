import React from "react";
import { Flex, Text, Icon, Button } from "@chakra-ui/react";

interface MenuItemProps {
    label: string; // Text to display
    icon: React.ElementType; // Icon component
    onClick: () => void; // Click handler
}

const MenuItem: React.FC<MenuItemProps> = ({ label, icon, onClick }) => {
    return (
        <Button
            onClick={onClick}
            w="full"
            justifyContent="flex-start"
            px={4}
            py={3}
            variant="ghost"
            _hover={{ bg: "mid-blue", color: "white" }}
            _active={{ bg: "dark-blue" }}
        >
            <Flex align="center" gap={3}>
                <Icon as={icon} boxSize={5} />
                <Text fontSize="lg" fontWeight="medium">
                    {label}
                </Text>
            </Flex>
        </Button>
    );
};

export default MenuItem;
