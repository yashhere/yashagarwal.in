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
        article: {
          css: {
            "--tw-prose-body": theme("colors.text"),
            "--tw-prose-headings": theme("colors.tertiary"),
            "--tw-prose-lead": theme("colors.text"),
            "--tw-prose-links": theme("colors.primary"),
            "--tw-prose-bold": theme("colors.text"),
            "--tw-prose-counters": theme("colors.primary"),
            "--tw-prose-bullets": theme("colors.primary"),
            "--tw-prose-hr": theme("colors.gray[300]"),
            "--tw-prose-quotes": theme("colors.gray[700]"),
            "--tw-prose-quote-borders": theme("colors.gray[300]"),
            "--tw-prose-captions": theme("colors.gray[500]"),
            "--tw-prose-code": theme("colors.code-text"),
            "--tw-prose-pre-code": theme("colors.code-text"),
            "--tw-prose-pre-bg": theme("colors.code-bg"),
            "--tw-prose-th-borders": theme("colors.gray[200]"),
            "--tw-prose-td-borders": theme("colors.gray[200]"),
          },
        },
        DEFAULT: { css: disabledCss },
        sm: { css: disabledCss },
        lg: { css: disabledCss },
        xl: { css: disabledCss },
        "2xl": { css: disabledCss },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
