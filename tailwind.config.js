const colors = require("tailwindcss/colors")

const linkHeadingStyles = {
  color: colors.gray[100],
  borderBottomColor: "transparent",
  borderRadius: 3,
  boxShadow: `0 0 0 0.4rem transparent`,
  "&:hover": {
    color: "none",
    borderBottomColor: "transparent",
    background: colors.gray[100],
    boxShadow: `0 0 0 0.4rem ${colors.gray[100]}`,
  },
}

const customCss = {
  "h2 a": linkHeadingStyles,
  "h3 a": linkHeadingStyles,
  "h4 a": linkHeadingStyles,
  "h5 a": linkHeadingStyles,
  "h6 a": linkHeadingStyles,
  "h3 a:has(code)": {
    boxShadow: `0 0 0 0.3rem transparent`,
    "&:hover": {
      background: colors.teal[900],
      boxShadow: `0 0 0 0.3rem ${colors.teal[900]}`,
    },
  },
  pre: false,
  code: false,
  "pre code": { content: "none !important" },
  blockquote: {
    "& p:first-of-type::before": { content: "none !important" },
    "& p:last-of-type::after": { content: "none !important" },
    "& p::before": { content: "none !important" },
    "& p::after": { content: "none !important" },
  },
  code: {
    color: "#86e1fc",
    "&::before": { content: `unset !important` },
    "&::after": { content: `unset !important` },
    fontWeight: "normal",
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
  "[data-rehype-pretty-code-fragment]:nth-of-type(2) pre": {
    "[data-line]::before": {
      content: "counter(line)",
      counterIncrement: "line",
      display: "inline-block",
      width: "1rem",
      marginRight: "1rem",
      textAlign: "right",
      color: colors.slate[600],
    },
    "[data-highlighted-line]::before": {
      color: colors.slate[400],
    },
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
        "pre-bg": "#151f28",
        "code-bg": "#737d8c2b",
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
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
