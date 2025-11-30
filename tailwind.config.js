const headingStyles = {
  fontWeight: 600,
  lineHeight: 1.2,
  marginTop: "1.5rem",
  marginBottom: "0.5rem",
}

const linkStyles = {
  color: "var(--primary)",
  textDecoration: "none",
  fontWeight: 500,
  "&:hover": {
    textDecoration: "underline",
  },
}

const typographyStyles = {
  DEFAULT: {
    css: {
      color: "var(--foreground)",
      maxWidth: "none",
      fontSize: "0.95rem", // Make default prose text slightly smaller
      lineHeight: "1.6", // Consistent line height
      h1: {
        ...headingStyles,
        fontSize: "1.875rem",
        marginTop: "0",
        "& > a": {
          color: "inherit",
          fontWeight: "inherit",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "none",
          },
        },
      },
      h2: {
        ...headingStyles,
        fontSize: "1.5rem",
        "& > a": {
          color: "inherit",
          fontWeight: "inherit",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "none",
          },
        },
      },
      h3: {
        ...headingStyles,
        fontSize: "1.25rem",
        "& > a": {
          color: "inherit",
          fontWeight: "inherit",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "none",
          },
        },
      },
      h4: {
        ...headingStyles,
        fontSize: "1.1rem",
        "& > a": {
          color: "inherit",
          fontWeight: "inherit",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "none",
          },
        },
      },
      a: linkStyles,
      p: {
        marginTop: "1.1rem",
        marginBottom: "1.1rem",
        lineHeight: "1.65",
      },
      "ul, ol": {
        paddingLeft: "1.25rem",
      },
      li: {
        marginTop: "0.5rem",
        marginBottom: "0.5rem",
        lineHeight: "1.65", // Consistent with paragraphs
      },
      blockquote: {
        fontWeight: "400",
        fontStyle: "italic",
        borderLeftWidth: "0.25rem",
        borderLeftColor: "var(--border)",
        paddingLeft: "1rem",
        marginTop: "1.5rem",
        marginBottom: "1.5rem",
        "& p:first-of-type::before": { content: "none" },
        "& p:last-of-type::after": { content: "none" },
        "& p": {
          lineHeight: "1.5", // Slightly tighter for quotes
        },
      },
      pre: {
        backgroundColor: "var(--syntax-bg)",
        borderRadius: "0.375rem",
        overflowX: "auto",
        fontSize: "0.9375rem",
        padding: "0.75rem",
      },
      code: {
        color: "var(--syntax-string)",
        backgroundColor: "var(--muted) / 0.5",
        padding: "0.2rem 0.4rem",
        borderRadius: "0.25rem",
        fontSize: "0.875rem",
        fontWeight: "400",
        "&::before": { content: "none" },
        "&::after": { content: "none" },
      },
      "pre code": {
        backgroundColor: "transparent",
        padding: "0",
        fontSize: "inherit", // Use parent size
      },
      // Code highlighting styles
      "[data-rehype-pretty-code-fragment]": {
        marginTop: "1.5rem",
        marginBottom: "1.5rem",

        // Line numbers and highlighting
        pre: {
          fontSize: "0.9375rem",
          padding: "0.75rem 0",
        },
        "[data-line]": {
          borderLeftWidth: "2px",
          borderColor: "transparent",
          paddingLeft: "0.75rem",
          paddingRight: "0.75rem",
        },
        "[data-highlighted-line]": {
          backgroundColor: "var(--syntax-highlight)",
          borderLeftColor: "var(--primary)",
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
        shimmer: "shimmer 2s ease-in-out infinite",
        blink: "blink 1s ease-in-out infinite",
        wobble: "wobble 1.2s ease-in-out",
      },
      keyframes: {
        spinner: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
        wobble: {
          "0%": { transform: "rotate(0deg)" },
          "10%": { transform: "rotate(20deg)" },
          "20%": { transform: "rotate(-18deg)" },
          "30%": { transform: "rotate(16deg)" },
          "40%": { transform: "rotate(-14deg)" },
          "50%": { transform: "rotate(12deg)" },
          "60%": { transform: "rotate(-10deg)" },
          "70%": { transform: "rotate(8deg)" },
          "80%": { transform: "rotate(-6deg)" },
          "90%": { transform: "rotate(4deg)" },
          "95%": { transform: "rotate(-2deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.6" }],
        lg: ["1.125rem", { lineHeight: "1.75" }],
        xl: ["1.25rem", { lineHeight: "1.75" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1.2" }],
        "6xl": ["3.75rem", { lineHeight: "1.1" }],
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        syntax: {
          bg: "var(--syntax-bg)",
          highlight: "var(--syntax-highlight)",
          text: "var(--syntax-txt)",
          comment: "var(--syntax-comment)",
          prop: "var(--syntax-prop)",
          bool: "var(--syntax-bool)",
          value: "var(--syntax-value)",
          string: "var(--syntax-string)",
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
