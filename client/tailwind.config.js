module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}", // Ensure Tailwind scans Chakra components
        "./index.html",
    ],
    theme: {
        extend: {
            colors: {
                white: "#E7ECEF",
                "light-blue": "#274C77",
                "mid-blue": "#6096BA",
                "dark-blue": "#A3CEF1",
                gray: "#8B8C89",
            },
            spacing: {
                xs: "4px",
                sm: "8px",
                md: "16px",
                lg: "24px",
                xl: "32px",
                "2xl": "40px",
            },
            fontSize: {
                xs: "12px",
                sm: "14px",
                base: "16px",
                lg: "18px",
                xl: "20px",
                "2xl": "24px",
            },
            borderRadius: {
                sm: "4px",
                md: "8px",
                lg: "12px",
                xl: "16px",
            },
            boxShadow: {
                subtle: "0 2px 4px rgba(0, 0, 0, 0.1)",
                medium: "0 4px 8px rgba(0, 0, 0, 0.15)",
                strong: "0 6px 12px rgba(0, 0, 0, 0.2)",
            },
            screens: {
                sm: "480px", // Mobile
                md: "768px", // Tablet
                lg: "1024px", // Laptop
                xl: "1280px", // Desktop
                "2xl": "1536px", // Large Screens
            },
        },
    },
    plugins: [],
};
