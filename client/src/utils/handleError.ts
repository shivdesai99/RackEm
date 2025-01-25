export const handleError = (error: unknown): void => {
    if (error instanceof Error) {
        console.error(`[Error]: ${error.message}`);
    } else {
        console.error("[Error]: An unknown error occurred.");
    }
};
