import typography from "@tailwindcss/typography"
import animate from "tailwindcss-animate"

const headingStyles = {
  fontFamily: "var(--font-serif)",
  fontWeight: 600,
  lineHeight: 1.2,
  marginTop: "2rem",
  marginBottom: "0.75rem",
  color: "var(--heading)",
}

const linkStyles = {
  color: "var(--heading)",
  textDecoration: "none",
  fontWeight: "inherit",
}

const typographyStyles = {
  DEFAULT: {
    css: {
      color: "var(--foreground)",
      maxWidth: "none",
      fontSize: "1rem", // 16px
      lineHeight: "1.625rem", // 26px
      h1: {
        ...headingStyles,
        fontSize: "1.75rem",
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
        fontSize: "1rem",
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
      strong: {
        color: "var(--heading)",
        fontWeight: "600",
      },
      em: {
        color: "var(--heading)",
      },
      "strong em, em strong": {
        color: "var(--heading)",
      },
      p: {
        marginTop: "1.25rem",
        marginBottom: "1.25rem",
        lineHeight: "1.625rem", // 26px
      },
      "ul, ol": {
        paddingLeft: "1.25rem",
        marginTop: "1rem",
        // marginBottom: "1.25rem",
      },
      li: {
        marginTop: "0.25rem",
        marginBottom: "0.25rem",
        lineHeight: "1.625rem", // 26px
      },
      blockquote: {
        fontFamily: "var(--font-serif)",
        fontWeight: "400",
        fontStyle: "normal",
        color: "var(--heading)",
        borderLeftWidth: "0.25rem",
        borderLeftColor: "var(--border)",
        paddingLeft: "1.25rem",
        marginTop: "2rem",
        marginBottom: "2rem",
        "& p:first-of-type::before": { content: "none" },
        "& p:last-of-type::after": { content: "none" },
        "& p": {
          lineHeight: "1.5", // Slightly tighter for quotes
          color: "var(--heading)",
        },
      },
      figcaption: {
        fontFamily: "var(--font-serif)",
        fontStyle: "italic",
        color: "var(--muted-foreground)",
        fontSize: "0.9375rem",
        marginTop: "0.75rem",
        textAlign: "center",
      },
      pre: {
        backgroundColor: "var(--syntax-bg)",
        borderRadius: "0.375rem",
        overflowX: "auto",
        fontSize: "1rem",
        padding: "0.75rem",
      },
      code: {
        color: "var(--syntax-string)",
        backgroundColor: "var(--muted) / 0.5",
        padding: "0.2rem 0.4rem",
        borderRadius: "0.25rem",
        fontSize: "0.9375rem",
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
          fontSize: "1rem",
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
const config = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
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
        xs: ["0.8125rem", { lineHeight: "1.25rem" }], // 13px / 20px
        sm: ["0.9375rem", { lineHeight: "1.375rem" }], // 15px / 22px
        base: ["1rem", { lineHeight: "1.5rem" }], // 16px / 24px
        lg: ["1.125rem", { lineHeight: "1.625rem" }], // 18px / 26px
        xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px / 28px
        "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px / 32px
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px / 36px
        "4xl": ["2.25rem", { lineHeight: "1.2" }], // 36px
        "5xl": ["3rem", { lineHeight: "1.1" }], // 48px
        "6xl": ["3.75rem", { lineHeight: "1.1" }], // 60px
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        heading: "var(--heading)",
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
        serif: ["var(--font-serif)"],
      },
      typography: typographyStyles,
    },
  },
  plugins: [typography, animate],
}

export default config
