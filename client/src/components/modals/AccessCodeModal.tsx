import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    FormControl,
    FormErrorMessage,
    useToast,
} from "@chakra-ui/react";
import { Group } from "@/types/models/Group";

interface AccessCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (groupId: number, joinCode: string) => Promise<void>;
    group: Group;
}

const AccessCodeModal: React.FC<AccessCodeModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    group,
}) => {
    const [joinCode, setJoinCode] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const toast = useToast();

    const handleSubmit = async () => {
        if (!joinCode.trim()) {
            setError("Access code is required.");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await onSubmit(group.id, joinCode);
            toast({
                title: "Group joined successfully!",
                description: `You have successfully joined the group: ${group.name}`,
                status: "success",
                duration: 1000,
                isClosable: true,
                position: "bottom",
                containerStyle: { paddingBottom: "50rem" },
            });
            onClose();
        } catch (err: any) {
            setError(
                err.message ||
                    "Failed to join the group. Please try again with the correct Join Code."
            );
            toast({
                title: "Error joining group",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
                containerStyle: { paddingBottom: "50rem" },
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign="center" color="dark-blue">
                    Join Group: {group.name}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl isInvalid={!!error}>
                        <Input
                            placeholder="Enter Access Code"
                            value={joinCode}
                            onChange={(e) => setJoinCode(e.target.value)}
                            variant="filled"
                            focusBorderColor="dark-blue"
                            _placeholder={{ color: "gray" }}
                            size="lg"
                            aria-label="Enter Access Code"
                        />
                        {error && (
                            <FormErrorMessage fontSize="sm" mt={2}>
                                {error}
                            </FormErrorMessage>
                        )}
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={handleSubmit}
                        isLoading={isSubmitting}
                        loadingText="Joining..."
                        colorScheme="blue"
                        bg="dark-blue"
                        _hover={{ bg: "mid-blue" }}
                        size="lg"
                        w="full"
                        aria-label="Join Group Button"
                    >
                        Join Group
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AccessCodeModal;
