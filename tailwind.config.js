/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#141c2e",        // main background
        surface: "#11162A",   // panels / nav
        card: "#151B34",      // cards
        primary: "#4DA3FF",   // main accent
        accent: "#22D3EE",    // cyan accent
        text: "#E5E7EB",      // primary text
        muted: "#9CA3AF",     // secondary text
        danger: "#EF4444",
      },

      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.35s ease-out",
      },

      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideUp: {
          from: { opacity: 0, transform: "translateY(6px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
