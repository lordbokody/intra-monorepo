import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "../../packages/ui/**/*.{js,ts,jsx,tsx}", // <- FONTOS
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};

export default config;
