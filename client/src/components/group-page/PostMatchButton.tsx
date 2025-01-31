import React from "react";
import { Button } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

interface PostScoreButtonProps {
    onOpen: () => void; // Function to open the Post Score Modal
}

// Define a smoother "shiny" animation with a pause
const shineAnimation = keyframes`
    0% {
        transform: translateX(-100%);
        opacity: 0;
    }
    10% {
        opacity: 0.3;
    }
    50% {
        transform: translateX(100%);
        opacity: 0.5;
    }
    90% {
        opacity: 0.3;
    }
    100% {
        transform: translateX(100%);
        opacity: 0;
    }
`;

const PostMatchButton: React.FC<PostScoreButtonProps> = ({ onOpen }) => {
    return (
        <Button
            onClick={onOpen}
            colorScheme="blue"
            bgGradient="linear(to-r, blue.600, blue.500, blue.500)"
            color="white"
            fontWeight="bold"
            fontSize="xl"
            minWidth="200px"
            height="65px"
            borderRadius="md"
            boxShadow="lg"
            overflow="hidden"
            _hover={{
                bgGradient: "linear(to-r, blue.500, blue.400, blue.600)",
                transform: "scale(1.05)",
            }}
            _active={{ transform: "scale(0.95)" }}
            _after={{
                content: '""',
                position: "absolute",
                top: 0,
                left: "-150%",
                width: "150%",
                height: "100%",
                background:
                    "linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)",
                animation: `${shineAnimation} 3.5s ease-in-out infinite`,
            }}
        >
            Post Match
        </Button>
    );
};

export default PostMatchButton;
