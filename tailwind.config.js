const customCss = {
  "code::before": false,
  "code::after": false,
  pre: false,
  code: false,
  "pre code": false,
  "blockquote p:first-of-type::before": false,
  "blockquote p:last-of-type::after": false,
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

const css = {
  color: "var(--tw-prose-body)",
  maxWidth: "65ch",
  '[class~="lead"]': {
    color: "var(--tw-prose-lead)",
  },
  a: {
    color: "var(--tw-prose-links)",
    textDecoration: "underline",
    fontWeight: "500",
  },
  strong: {
    color: "var(--tw-prose-bold)",
    fontWeight: "600",
  },
  "a strong": {
    color: "inherit",
  },
  "blockquote strong": {
    color: "inherit",
  },
  "thead th strong": {
    color: "inherit",
  },
  ol: {
    listStyleType: "decimal",
  },
  'ol[type="A"]': {
    listStyleType: "upper-alpha",
  },
  'ol[type="a"]': {
    listStyleType: "lower-alpha",
  },
  'ol[type="A" s]': {
    listStyleType: "upper-alpha",
  },
  'ol[type="a" s]': {
    listStyleType: "lower-alpha",
  },
  'ol[type="I"]': {
    listStyleType: "upper-roman",
  },
  'ol[type="i"]': {
    listStyleType: "lower-roman",
  },
  'ol[type="I" s]': {
    listStyleType: "upper-roman",
  },
  'ol[type="i" s]': {
    listStyleType: "lower-roman",
  },
  'ol[type="1"]': {
    listStyleType: "decimal",
  },
  ul: {
    listStyleType: "disc",
  },
  "ol > li::marker": {
    fontWeight: "400",
    color: "var(--tw-prose-counters)",
  },
  "ul > li::marker": {
    color: "var(--tw-prose-bullets)",
  },
  hr: {
    borderColor: "var(--tw-prose-hr)",
    borderTopWidth: 1,
  },
  blockquote: {
    fontWeight: "500",
    fontStyle: "italic",
    color: "var(--tw-prose-quotes)",
    borderLeftWidth: "0.25rem",
    borderLeftColor: "var(--tw-prose-quote-borders)",
    quotes: '"\\201C""\\201D""\\2018""\\2019"',
  },
  "blockquote p:first-of-type::before": {
    content: "open-quote",
  },
  "blockquote p:last-of-type::after": {
    content: "close-quote",
  },
  h1: {
    color: "var(--tw-prose-headings)",
    fontWeight: "800",
  },
  "h1 strong": {
    fontWeight: "900",
    color: "inherit",
  },
  h2: {
    color: "var(--tw-prose-headings)",
    fontWeight: "700",
  },
  "h2 strong": {
    fontWeight: "800",
    color: "inherit",
  },
  h3: {
    color: "var(--tw-prose-headings)",
    fontWeight: "600",
  },
  "h3 strong": {
    fontWeight: "700",
    color: "inherit",
  },
  h4: {
    color: "var(--tw-prose-headings)",
    fontWeight: "600",
  },
  "h4 strong": {
    fontWeight: "700",
    color: "inherit",
  },
  // TODO: Figure out how to not need these, it's a merging issue
  img: {},
  "figure > *": {},
  figcaption: {
    color: "var(--tw-prose-captions)",
  },
  code: {
    color: "var(--tw-prose-code)",
    fontWeight: "600",
  },
  "code::before": {
    content: '"`"',
  },
  "code::after": {
    content: '"`"',
  },
  "a code": {
    color: "inherit",
  },
  "h1 code": {
    color: "inherit",
  },
  "h2 code": {
    color: "inherit",
  },
  "h3 code": {
    color: "inherit",
  },
  "h4 code": {
    color: "inherit",
  },
  "blockquote code": {
    color: "inherit",
  },
  "thead th code": {
    color: "inherit",
  },
  pre: {
    color: "var(--tw-prose-pre-code)",
    backgroundColor: "var(--tw-prose-pre-bg)",
    overflowX: "auto",
    fontWeight: "400",
  },
  "pre code": {
    backgroundColor: "transparent",
    borderWidth: "0",
    borderRadius: "0",
    padding: "0",
    fontWeight: "inherit",
    color: "inherit",
    fontSize: "inherit",
    fontFamily: "inherit",
    lineHeight: "inherit",
  },
  "pre code::before": {
    content: "none",
  },
  "pre code::after": {
    content: "none",
  },
  table: {
    width: "100%",
    tableLayout: "auto",
    textAlign: "left",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
  thead: {
    borderBottomWidth: "1px",
    borderBottomColor: "var(--tw-prose-th-borders)",
  },
  "thead th": {
    color: "var(--tw-prose-headings)",
    fontWeight: "600",
    verticalAlign: "bottom",
  },
  "tbody tr": {
    borderBottomWidth: "1px",
    borderBottomColor: "var(--tw-prose-td-borders)",
  },
  "tbody tr:last-child": {
    borderBottomWidth: "0",
  },
  "tbody td": {
    verticalAlign: "baseline",
  },
  tfoot: {
    borderTopWidth: "1px",
    borderTopColor: "var(--tw-prose-th-borders)",
  },
  "tfoot td": {
    verticalAlign: "top",
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
    // container: {
    //   center: true,
    //   padding: "2rem",
    //   screens: {
    //     "2xl": "1400px",
    //   },
    // },
    extend: {
      colors: {
        text: "hsl(var(--color-text))",
        primary: "hsl(var(--color-primary))",
        background: "hsl(var(--color-background))",
        "pre-bg": "#151f28",
        "code-bg": "#737d8c2b",
        gray: {
          DEFAULT: "var(--color-gray-400)",
          100: "var(--color-gray-100)",
          200: "var(--color-gray-200)",
          300: "var(--color-gray-300)",
          400: "var(--color-gray-400)",
          500: "var(--color-gray-500)",
          600: "var(--color-gray-600)",
          700: "var(--color-gray-700)",
          900: "var(--color-gray-900)",
          1000: "var(--color-gray-1000)",
          1100: "var(--color-gray-1100)",
          1200: "var(--color-gray-1200)",
        },
      },
      fontSize: {
        sm: ["14px", "20px"],
        base: ["16px", "28px"],
        lg: ["18px", "30px"],
        xl: ["24px", "34px"],
      },
      fontFamily: {
        sans: ["var(--font-geist-regular)"],
        serif: ["var(--font-news-reader)"],
        mono: ["var(--font-geist-mono)"],
      },
      typography: ({ theme }) => ({}),
    },
  },
  //   plugins: [require("@tailwindcss/typography")],
}
