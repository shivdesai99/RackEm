import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        white: "#E7ECEF",
        "light-blue": "#274C77",
        "mid-blue": "#6096BA",
        "dark-blue": "#A3CEF1",
        gray: "#8B8C89",
    },
    fonts: {
        body: "'Inter', sans-serif",
        heading: "'Inter', sans-serif",
        mono: "Menlo, monospace",
    },
    breakpoints: {
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
    },
    radii: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
    },
    shadows: {
        subtle: "0 2px 4px rgba(0, 0, 0, 0.1)",
        medium: "0 4px 8px rgba(0, 0, 0, 0.15)",
        strong: "0 6px 12px rgba(0, 0, 0, 0.2)",
    },
});

export default theme;
