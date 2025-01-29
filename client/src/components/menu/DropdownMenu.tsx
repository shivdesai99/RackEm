import React from "react";
import { Box, VStack, useOutsideClick } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useMenu } from "@/hooks/useMenu";
import MenuItem from "@/components/menu/MenuItem";
import { FiUser, FiHome, FiLogOut, FiSettings } from "react-icons/fi";

const DropdownMenu: React.FC = () => {
    const {
        isMenuOpen,
        closeMenu,
        navigateToProfile,
        navigateToGroupDashboard,
        navigateToChangeGroup,
        logout,
    } = useMenu();

    const menuRef = React.useRef<HTMLDivElement>(null);

    // Close menu on outside click
    useOutsideClick({
        ref: menuRef,
        handler: (event) => {
            const target = event.target as HTMLElement;
            // Exclude clicks on the MenuIcon
            if (!target.closest("[aria-label='Open Menu']")) {
                closeMenu();
            }
        },
    });

    // Animation settings
    const itemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
    };

    const containerVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: {
            opacity: 1,
            height: "auto",
            transition: { staggerChildren: 0.1 },
        },
    };

    return (
        <AnimatePresence>
            {isMenuOpen && (
                <Box
                    ref={menuRef}
                    as={motion.div}
                    initial={{ x: "100%" }}
                    animate={{ x: "0%" }}
                    exit={{ x: "100%" }}
                    position="fixed"
                    top="auto"
                    right={0}
                    h="100vh"
                    w="70%"
                    maxW="250px"
                    bg="white"
                    shadow="subtle"
                    zIndex={100}
                >
                    <VStack
                        as={motion.div}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={containerVariants}
                        spacing={4}
                        align="stretch"
                        py={2}
                        px={4}
                        onClick={closeMenu}
                    >
                        <motion.div variants={itemVariants}>
                            <MenuItem
                                label="My Profile"
                                icon={FiUser}
                                onClick={navigateToProfile}
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <MenuItem
                                label="Group Dashboard"
                                icon={FiHome}
                                onClick={navigateToGroupDashboard}
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <MenuItem
                                label="Change Group"
                                icon={FiSettings}
                                onClick={navigateToChangeGroup}
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <MenuItem
                                label="Logout"
                                icon={FiLogOut}
                                onClick={logout}
                            />
                        </motion.div>
                    </VStack>
                </Box>
            )}
        </AnimatePresence>
    );
};

export default DropdownMenu;
