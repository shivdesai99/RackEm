module.exports = {
    theme: {
        extend: {
            colors: {
                white: "#E7ECEF",
                "light-blue": "#A3CEF1",
                "mid-blue": "#6096BA",
                "dark-blue": "#274C77",
                gray: "#8B8C89",
            },
            fontFamily: {
                body: ["Inter", "sans-serif"],
                heading: ["Inter", "sans-serif"],
                mono: ["Menlo", "monospace"],
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
                sm: "480px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
                "2xl": "1536px",
            },
        },
    },
    plugins: [],
};
