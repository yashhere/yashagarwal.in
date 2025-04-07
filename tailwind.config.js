const customCss = {
    pre: false,
    code: false,
    "pre code": { content: "none !important" },
    "blockquote": {
        "& p:first-of-type::before": { content: "none !important" },
        "& p:last-of-type::after": { content: "none !important" },
        "& p::before": { content: "none !important" },
        "& p::after": { content: "none !important" }
    },
    "code": {
        "&::before": { content: "none !important" },
        "&::after": { content: "none !important" }
    },
    "> ul > li > *:first-child": {
        marginTop: 0,
    },
    "> ul > li > *:last-child": {
        marginBottom: 0,
    },
    "> ol > li > *:first-child": {
        marginTop: 0,
    },
    "> ol > li > *:last-child": {
        marginBottom: 0,
    },
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
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      animation: {
        // Custom spinner animation (for loading-spinner)
        spinner: "spinner 1.2s linear infinite",
      },
      keyframes: {
        // Custom spinner animation (for loading-spinner)
        spinner: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
      lineHeight: {
        7: "30px",
      },
      colors: {
        text: "hsl(var(--color-text))",
        muted: "hsl(var(--color-muted))",
        info: "hsl(var(--color-info))",
        foreground: "hsl(var(--color-foreground))",
        primary: "hsl(var(--color-primary))",
        secondary: "hsl(var(--color-secondary))",
        tertiary: "hsl(var(--color-tertiary))",
        background: "hsl(var(--color-background))",
        "background-muted": "hsl(var(--color-muted-background))",
        "background-subtle": "hsl(var(--color-subtle-background))",
        "pre-bg": "#0d1a26",
        "code-bg": "#2c3e50",
        "code-text": "hsl(var(--color-syntax-txt))",
        gray: {
          DEFAULT: "hsl(var(--color-gray-400))",
          100: "hsl(var(--color-gray-100))",
          200: "hsl(var(--color-gray-200))",
          300: "hsl(var(--color-gray-300))",
          400: "hsl(var(--color-gray-400))",
          500: "hsl(var(--color-gray-500))",
          600: "hsl(var(--color-gray-600))",
          700: "hsl(var(--color-gray-700))",
          900: "hsl(var(--color-gray-900))",
          1000: "hsl(var(--color-gray-1000))",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)"],
        body: ["var(--font-body)"],
        heading: ["var(--font-body)"],
      },
      typography: ({ theme }) => ({
        DEFAULT: { css: customCss },
        sm: { css: customCss },
        lg: { css: customCss },
        xl: { css: customCss },
        "2xl": { css: customCss },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
