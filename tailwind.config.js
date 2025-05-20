const colors = require("tailwindcss/colors")

const linkHeadingStyles = {
  color: "hsl(var(--foreground))",
  borderBottomColor: "transparent",
  borderRadius: 3,
  boxShadow: `0 0 0 0.4rem transparent`,
  "&:hover": {
    color: "none",
    borderBottomColor: "transparent",
    background: "hsl(var(--muted))",
    boxShadow: `0 0 0 0.4rem hsl(var(--muted))`,
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
    color: "hsl(var(--syntax-string))",
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
      color: "hsl(var(--muted-foreground))",
    },
    "[data-highlighted-line]::before": {
      color: "hsl(var(--foreground))",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Syntax highlighting colors
        syntax: {
          bg: "hsl(var(--syntax-bg))",
          highlight: "hsl(var(--syntax-highlight))",
          text: "hsl(var(--syntax-txt))",
          comment: "hsl(var(--syntax-comment))",
          prop: "hsl(var(--syntax-prop))",
          bool: "hsl(var(--syntax-bool))",
          value: "hsl(var(--syntax-value))",
          string: "hsl(var(--syntax-string))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 0.125rem)",
        sm: "calc(var(--radius) - 0.25rem)",
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
