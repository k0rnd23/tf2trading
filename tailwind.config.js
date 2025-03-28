/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tf2build: ["TF2Build", "sans-serif"],
        tf2secondary: ["TF2Secondary", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#CF7336", // TF2 orange
          light: "#F5D6B8",
          dark: "#B86529",
        },
        tf2: {
          bg: "#2A2A2A",
          foreground: "#F2F3F5",
          muted: "#36393F",
          border: "#444444",
          redteam: "#B8383B",
          bluteam: "#5885A2",
          unusual: "#8650AC",
          vintage: "#476291",
          genuine: "#4D7455",
          strange: "#CF6A32",
          australium: "#FFD700",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
      },
      backgroundImage: {
        'tf2-metal': "url('/textures/tf2-metal.jpg')",
        'tf2-blueprint': "url('/textures/tf2-blueprint.jpg')",
        'tf2-noise': "url('/textures/tf2-background-noise.png')",
        'tf2-sandvich': "url('/textures/tf2-sandvich-pattern.png')",
      },
      animation: {
        'slideDown': 'slideDown 0.3s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'tf2-hover': 'tf2Hover 0.3s ease-in-out',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        tf2Hover: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
          '100%': { transform: 'translateY(0)' },
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'tf2': 'inset 0px 1px 0px rgba(255, 255, 255, 0.2), 0px 3px 0px rgba(0, 0, 0, 0.5)',
        'tf2-button': 'inset 0px 1px 0px rgba(255, 255, 255, 0.4), inset 0px -1px 0px rgba(0, 0, 0, 0.4), 0px 2px 0px #000',
        'tf2-card': 'inset 0px 1px 0px rgba(255, 255, 255, 0.1), 0px 3px 0px rgba(0, 0, 0, 0.4)',
        'tf2-unusual': '0 0 8px rgba(134, 80, 172, 0.7)',
        'tf2-strange': '0 0 8px rgba(207, 106, 50, 0.7)',
      },
      textShadow: {
        'tf2': '1px 1px 0px rgba(0, 0, 0, 0.5)',
        'tf2-header': '2px 2px 0px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '1px 1px 0px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-header': {
          textShadow: '2px 2px 0px rgba(0, 0, 0, 0.5)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}