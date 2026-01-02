import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#C58E1A", // Golden Mustard
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#1A1A1A", // Deep Obsidian
                    foreground: "#F9F6F0",
                },
                background: "#F9F6F0", // Creamy Heritage White
                foreground: "#1A1A1A",
                accent: {
                    DEFAULT: "#8B0000", // Deep Maroon
                    foreground: "#FFFFFF",
                },
                card: {
                    DEFAULT: "#FFFFFF",
                    foreground: "#1A1A1A",
                },
            },
            fontFamily: {
                serif: ["var(--font-serif)"],
                sans: ["var(--font-sans)"],
            },
        },
    },
    plugins: [],
};
export default config;
