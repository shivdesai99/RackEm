import React from "react";
import { FormControl, Input, FormErrorMessage } from "@chakra-ui/react";

interface FormInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    placeholder?: string;
    isInvalid?: boolean;
    errorMessage?: string;
}

const FormInput: React.FC<FormInputProps> = ({
    label,
    value,
    onChange,
    type = "text",
    placeholder,
    isInvalid = false,
    errorMessage,
}) => {
    return (
        <FormControl isInvalid={isInvalid} mb={4}>
            <Input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                variant="filled"
                size="lg"
                fontSize={{ base: "md", md: "lg" }}
                py={{ base: 4, md: 5 }}
                px={{ base: 4, md: 5 }}
                focusBorderColor="dark-blue"
                errorBorderColor="red.500"
                borderRadius="md"
            />
            {isInvalid && (
                <FormErrorMessage fontSize={{ base: "sm", md: "md" }}>
                    {errorMessage}
                </FormErrorMessage>
            )}
        </FormControl>
    );
};

export default FormInput;
