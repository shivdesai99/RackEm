// src/components/group-page/PostScoreButton.tsx

import React from "react";
import { IconButton } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

interface PostScoreButtonProps {
    onOpen: () => void; // Function to open the Post Score Modal
}

const PostMatchButton: React.FC<PostScoreButtonProps> = ({ onOpen }) => {
    return (
        <IconButton
            aria-label="Post a match score"
            icon={<FaPlus />}
            colorScheme="white"
            size="lg"
            borderRadius="full"
            boxShadow="md"
            onClick={onOpen}
            _hover={{ bg: "mid-blue" }}
        />
    );
};

export default PostMatchButton;
