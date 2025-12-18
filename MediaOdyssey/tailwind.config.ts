import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            borderRadius: {
                lg: ".5625rem",
                md: ".375rem",
                sm: ".1875rem",
            },
            colors: {
                'space-navy': 'hsl(230, 35%, 8%)',
                'deep-teal': 'hsl(180, 45%, 25%)',
                'cosmic-purple': 'hsl(270, 40%, 20%)',
                'golden-amber': 'hsl(45, 80%, 50%)',
                'bright-cyan': 'hsl(180, 85%, 65%)',
                'warm-gold': 'hsl(45, 90%, 55%)',
                'vibrant-emerald': 'hsl(150, 70%, 50%)',
                'muted-gray': 'hsl(220, 10%, 40%)',
                background: "hsl(var(--background) / <alpha-value>)",
                foreground: "hsl(var(--foreground) / <alpha-value>)",
                border: "hsl(var(--border) / <alpha-value>)",
                input: "hsl(var(--input) / <alpha-value>)",
                ring: "hsl(var(--ring) / <alpha-value>)",
                primary: {
                    DEFAULT: "hsl(var(--primary) / <alpha-value>)",
                    foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
                    foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
                },
            },
            fontFamily: {
                sans: ["Inter", "var(--font-sans)"],
                display: ["Orbitron", "var(--font-sans)"],
                mono: ["var(--font-mono)"],
            },
            backgroundImage: {
                'primary-gradient': 'linear-gradient(135deg, hsl(230, 35%, 8%) 0%, hsl(180, 45%, 25%) 35%, hsl(270, 40%, 20%) 70%, hsl(45, 80%, 50%) 100%)',
                'golden-path': 'linear-gradient(90deg, hsl(45, 90%, 55%), hsl(180, 85%, 65%))',
            },
            keyframes: {
                'pulse-glow': {
                    '0%, 100%': {
                        boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)',
                        transform: 'scale(1)'
                    },
                    '50%': {
                        boxShadow: '0 0 30px rgba(34, 211, 238, 0.8)',
                        transform: 'scale(1.02)'
                    },
                },
                'pulse-gold': {
                    '0%, 100%': {
                        boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)',
                    },
                    '50%': {
                        boxShadow: '0 0 30px rgba(251, 191, 36, 0.8)',
                    },
                },
            },
            animation: {
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'pulse-gold': 'pulse-gold 1.5s ease-in-out infinite',
            },
        },
    },
    plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
