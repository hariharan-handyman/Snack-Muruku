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
                    DEFAULT: "#1E40AF", // Deep Blue
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#3B82F6", // Royal Blue
                    foreground: "#FFFFFF",
                },
                background: "#FFFFFF",
                foreground: "#1E3A8A",
                accent: {
                    DEFAULT: "#FACC15", // Yellow
                    foreground: "#1E3A8A",
                },
                muted: {
                    DEFAULT: "#F8FAFC",
                    foreground: "#64748B",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                display: ["var(--font-inter)", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;
