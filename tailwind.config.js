const headingStyles = {
  fontWeight: 600,
  lineHeight: 1.25,
  marginTop: "1.5em",
  marginBottom: "0.75em",
}

const linkStyles = {
  color: "hsl(var(--primary))",
  textDecoration: "none",
  fontWeight: 500,
  "&:hover": {
    textDecoration: "underline",
  },
}

const typographyStyles = {
  DEFAULT: {
    css: {
      color: "hsl(var(--foreground))",
      maxWidth: "none",
      h1: {
        ...headingStyles,
        fontSize: "2.25rem",
        marginTop: "0",
      },
      h2: {
        ...headingStyles,
        fontSize: "1.875rem",
      },
      h3: {
        ...headingStyles,
        fontSize: "1.5rem",
      },
      h4: {
        ...headingStyles,
        fontSize: "1.25rem",
      },
      a: linkStyles,
      p: {
        marginTop: "1.25em",
        marginBottom: "1.25em",
        lineHeight: "1.75",
      },
      "ul, ol": {
        paddingLeft: "1.25rem",
      },
      li: {
        marginTop: "0.5em",
        marginBottom: "0.5em",
      },
      blockquote: {
        fontWeight: "400",
        fontStyle: "italic",
        borderLeftWidth: "0.25rem",
        borderLeftColor: "hsl(var(--border))",
        paddingLeft: "1rem",
        marginTop: "1.5em",
        marginBottom: "1.5em",
        "& p:first-of-type::before": { content: "none" },
        "& p:last-of-type::after": { content: "none" },
      },
      pre: {
        backgroundColor: "hsl(var(--syntax-bg))",
        borderRadius: "0.375rem",
        padding: "1rem",
        overflowX: "auto",
      },
      code: {
        color: "hsl(var(--syntax-string))",
        backgroundColor: "hsl(var(--muted) / 0.5)",
        padding: "0.25rem",
        borderRadius: "0.25rem",
        fontSize: "0.875em",
        fontWeight: "400",
        "&::before": { content: "none" },
        "&::after": { content: "none" },
      },
      "pre code": {
        backgroundColor: "transparent",
        padding: "0",
      },
      // Code highlighting styles
      "[data-rehype-pretty-code-fragment]": {
        marginTop: "1.5em",
        marginBottom: "1.5em",

        // Line numbers and highlighting
        pre: {
          padding: "1rem",
        },
        "[data-line]": {
          paddingLeft: "1rem",
          borderLeftWidth: "2px",
          borderColor: "transparent",
        },
        "[data-highlighted-line]": {
          backgroundColor: "hsl(var(--syntax-highlight) / 0.1)",
          borderLeftColor: "hsl(var(--primary))",
        },
      },
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
        spinner: "spinner 1.2s linear infinite",
      },
      keyframes: {
        spinner: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
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
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      typography: typographyStyles,
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
