import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        text: {
          DEFAULT: "#1f2937", // gray-800
          muted: "#6b7280", // gray-500
        },
        brand: {
          primary: "#8b5cf6", // purple-500
          dark: "#6d28d9", // purple-700
          light: "#ede9fe", // purple-100
        },
        divider: "#4b5563", // Tailwind gray-600
        // Muted
        muted: "#cccccc", // Tailwind gray-200
        surface: {
          dark: "#2e1065",
          light: "#ffffff", // white
          muted: "#f3f4f6", // Tailwind gray-100
        },
        overlay: {
          dark: "rgba(76, 29, 149, 0.5)", // semi-transparent purple-900
        },
        // "border-muted": "#d1d5db", // Tailwind gray-300
        "surface-muted": "#eeeeee",
        // Dark mode colors commented out as unused
        "on-dark": "#ede9fe", // purple-100
        "surface-dark": "#2e1065", // purple-950
        "hover-dark": "#4c1d95", // purple-900
        "active-dark": "#6b21a8", // purple-800
      },
    },
    typography: (theme: any) => ({
      DEFAULT: {
        css: {
          h2: { marginBottom: theme("spacing.4") },
          h3: { marginBottom: theme("spacing.3") },
          h4: { marginBottom: theme("spacing.2") },
        },
      },
    }),
  },
  plugins: [],
} satisfies Config;
