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
  },
  plugins: [require('@tailwindcss/typography')],
  
} satisfies Config;
