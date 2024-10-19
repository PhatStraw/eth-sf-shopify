/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "dark",
  darkMode: ["selector", "[data-theme='dark']"],
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        light: {
          primary: "#007bff",
          "primary-content": "#ffffff",
          secondary: "#6c757d",
          "secondary-content": "#ffffff",
          accent: "#28a745",
          "accent-content": "#ffffff",
          neutral: "#f8f9fa",
          "neutral-content": "#212529",
          "base-100": "#ffffff",
          "base-200": "#f1f1f1",
          "base-300": "#e9ecef",
          "base-content": "#212529",
          info: "#17a2b8",
          success: "#28a745",
          warning: "#ffc107",
          error: "#dc3545",

          "--rounded-btn": "0.25rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
      {
        dark: {
          primary: "#000000", // Black
          "primary-content": "#ffffff", // White
          secondary: "#28a745", // Green
          "secondary-content": "#ffffff", // White
          accent: "#ffffff", // White
          "accent-content": "#000000", // Black
          neutral: "#1a1a1a", // Darker Black
          "neutral-content": "#f0f0f0", // Light Gray
          "base-100": "#ffffff", // White
          "base-200": "#f8f9fa", // Light Gray
          "base-300": "#e0e0e0", // Gray
          "base-content": "#000000", // Black
          info: "#17a2b8", // Info Color
          success: "#28a745", // Green
          warning: "#ffc107", // Warning Color
          error: "#dc3545", // Error Color

          "--rounded-btn": "0.25rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
            "--tooltip-color": "oklch(var(--p))",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
    ],
  },
  theme: {
    extend: {
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
};
