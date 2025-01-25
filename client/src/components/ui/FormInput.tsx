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
                focusBorderColor="light-blue"
                errorBorderColor="red.500"
                borderRadius="md"
            />
            {isInvalid && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
        </FormControl>
    );
};

export default FormInput;
