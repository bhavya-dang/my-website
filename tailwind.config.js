/** @type {import('tailwindcss').Config} */

// fix: ensure dynamic colors work in tailwind
import { notionColors } from "./constants/index";
const colorList = [];
const extendedColors = {};

for (const key in notionColors) {
  // To avoid tailWind "Color deprecated" warning
  if (
    !["lightBlue", "warmGray", "trueGray", "coolGray", "blueGray"].includes(key)
  ) {
    const value = notionColors[key];
    extendedColors[key] = notionColors[key];
    colorList.push(`text-[${value}]`);
    colorList.push(`bg-[${value}]`);
  }
}

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./constants/*",
  ],
  darkMode: "class",
  safelist: colorList,
  theme: {
    extend: {
      colors: extendedColors,
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        wiggle: "wiggle 1s linear infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
    plugins: [],
  },
};
