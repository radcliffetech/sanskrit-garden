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
        surface: "#ffffff",
        text: {
          DEFAULT: "#1f2937", // gray-800
          muted: "#6b7280", // gray-500
        },
        action: {
          primary: "#2563eb", // blue-600
          danger: "#dc2626", // red-600
        },
        divider: "#4b5563", // Tailwind gray-600
        // Dark mode
        "on-dark": "#ffffff",
        "surface-dark": "#111827", // Tailwind gray-900
        "hover-dark": "#1f2937", // Tailwind gray-800
        "active-dark": "#374151", // Tailwind gray-700
        "overlay-dark": "rgba(0, 0, 0, 0.5)",
        // Muted
        muted: "#cccccc", // Tailwind gray-200
        // "border-muted": "#d1d5db", // Tailwind gray-300
        "surface-muted": "#eeeeee",
      },
    },
     typography: (theme: any) => ({
        DEFAULT: {
          css: {
            h2: { marginBottom: theme('spacing.4') },
            h3: { marginBottom: theme('spacing.3') },
            h4: { marginBottom: theme('spacing.2') },
          },
        },
      }),
  },
  plugins: [],
} satisfies Config;
