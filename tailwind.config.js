const disabledCss = {
  "code::before": false,
  "code::after": false,
  pre: false,
  code: false,
  "pre code": false,
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{js,ts}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        black: "#0A0A0A",
        white: "#FFFFFF",
        primary: {
          DEFAULT: "#4433FF",
          300: "#695CFF",
          400: "#4433FF",
          500: "#1500FA",
          600: "#1000C2",
        },
        secondary: {
          DEFAULT: "#2C0B8E",
          300: "#2C0B8E",
          400: "#1C075A",
          500: "#0C0326",
        },
        tertiary: {
          DEFAULT: "#E60067",
          200: "#FF107B",
          300: "#E60067",
          400: "#AE004E",
          500: "#760035",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)"],
        body: ["var(--font-body)"],
        heading: ["var(--font-body)"],
      },
      typography: {
        DEFAULT: { css: disabledCss },
        sm: { css: disabledCss },
        lg: { css: disabledCss },
        xl: { css: disabledCss },
        "2xl": { css: disabledCss },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
