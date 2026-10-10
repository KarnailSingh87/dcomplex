/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./rooms.html",
    "./gym.html",
    "./grocery.html",
    "./nearby.html",
    "./js/**/*.js"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0f382a",
        "primary-dark": "#07231a",
        "primary-light": "#1b4d3b",
        "primary-container": "#e8f2ec",
        "primary-fixed": "#1b4d3b",
        "primary-fixed-dim": "#a3cfbb",
        "on-primary": "#ffffff",
        "on-primary-container": "#07231a",
        "on-primary-fixed": "#ffffff",
        secondary: "#316b54",
        "secondary-container": "#d4e8de",
        "secondary-fixed": "#e8f5ee",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#0b2018",
        "on-secondary-fixed": "#0b2018",
        accent: "#b45309",
        "accent-soft": "#fef3c7",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#fafaf9",
        "surface-container": "#f5f5f4",
        "surface-container-high": "#e7e5e4",
        "text-surface-container-lowest": "#ffffff",
        "on-surface": "#1c1917",
        "on-surface-variant": "#57534e",
        neutral: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          600: "#57534e",
          800: "#292524",
          900: "#1c1917"
        }
      },
      fontSize: {
        "label-sm": ["0.75rem", { lineHeight: "1rem", fontWeight: "600" }],
        "label-md": ["0.875rem", { lineHeight: "1.25rem", fontWeight: "600" }],
        "label-lg": ["1rem", { lineHeight: "1.5rem", fontWeight: "600" }],
        "body-sm": ["0.75rem", { lineHeight: "1rem", fontWeight: "400" }],
        "headline-sm": ["1.125rem", { lineHeight: "1.5rem", fontWeight: "700" }],
        "headline-md": ["1.25rem", { lineHeight: "1.75rem", fontWeight: "700" }],
        "headline-lg-mobile": ["1.5rem", { lineHeight: "2rem", fontWeight: "800" }]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ]
};
