import React, { useState, useContext } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast,
} from "@chakra-ui/react";
import SearchableDropdown from "@/components/menu/SearchableDropdown";
import GroupPageContext from "@/context/GroupPageContext";

interface PostMatchModalProps {
    isOpen: boolean;
    onClose: () => void;
    groupId: number;
}

const PostMatchModal: React.FC<PostMatchModalProps> = ({
    isOpen,
    onClose,
    groupId,
}) => {
    const { postMatchResult } = useContext(GroupPageContext)!;
    const toast = useToast();

    const [winner, setWinner] = useState<{
        user_id: number;
        name: string;
    } | null>(null);
    const [loser, setLoser] = useState<{
        user_id: number;
        name: string;
    } | null>(null);
    const [ballsLeft, setBallsLeft] = useState<string>("");

    const handlePostMatch = async () => {
        if (!winner || !loser) {
            toast({
                title: "Error",
                description: "Please select both a winner and a loser.",
                status: "error",
                duration: 1000,
                isClosable: true,
                position: "top",
                containerStyle: { paddingTop: "15rem" },
            });
            return;
        }

        if (winner.user_id === loser.user_id) {
            toast({
                title: "Invalid Selection",
                description: "Winner and loser cannot be the same user.",
                status: "error",
                duration: 1000,
                isClosable: true,
                position: "top",
                containerStyle: { paddingTop: "13rem" },
            });
            return;
        }

        try {
            await postMatchResult(
                groupId,
                winner.user_id,
                loser.user_id,
                ballsLeft ? parseInt(ballsLeft) : null
            );
            toast({
                title: "Match Posted",
                description: "The match result has been recorded.",
                status: "success",
                duration: 1000,
                isClosable: true,
                position: "top",
                containerStyle: { paddingTop: "13rem" },
            });
            onClose();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to post match. Please try again.",
                status: "error",
                duration: 1000,
                isClosable: true,
                position: "top",
                containerStyle: { paddingTop: "13rem" },
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInTop">
            <ModalOverlay backdropFilter="blur(6px)" />
            <ModalContent
                bg="rgba(30, 30, 30, 0.85)"
                color="white"
                border="2px solid rgba(255, 255, 255, 0.7)"
                boxShadow="0px 10px 30px rgba(0, 0, 0, 0.6)"
                borderRadius="lg"
                maxW="650px"
                minH="550px"
                mt="10vh"
                p={6}
            >
                <ModalHeader textAlign="center" fontSize="2xl">
                    Post a Match Result
                </ModalHeader>
                <ModalBody>
                    <FormControl mb={6}>
                        <FormLabel fontSize="lg">Winner</FormLabel>
                        <SearchableDropdown
                            groupId={groupId}
                            placeholder="Search for winner..."
                            onSelect={setWinner}
                        />
                    </FormControl>

                    <FormControl mb={6}>
                        <FormLabel fontSize="lg">Loser</FormLabel>
                        <SearchableDropdown
                            groupId={groupId}
                            placeholder="Search for loser..."
                            onSelect={setLoser}
                        />
                    </FormControl>

                    <FormControl mb={6}>
                        <FormLabel fontSize="lg">
                            Balls Left (Optional)
                        </FormLabel>
                        <Input
                            type="number"
                            placeholder="Enter balls left"
                            bg="black"
                            color="white"
                            border="1px solid white"
                            value={ballsLeft}
                            onChange={(e) => setBallsLeft(e.target.value)}
                            min={0}
                        />
                    </FormControl>
                </ModalBody>

                <ModalFooter display="flex" justifyContent="center">
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue" onClick={handlePostMatch}>
                        Post Match
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default PostMatchModal;
