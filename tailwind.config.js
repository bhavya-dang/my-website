/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

import internal from "stream";
// fix: ensure dynamic colors work in tailwind
import { notionColors } from "./constants/index";
const svgToDataUri = require("mini-svg-data-uri");

const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

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
        satoshi: ["Satoshi"],
        mono: ["Hack", "monospace"],
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        wiggle: "wiggle 1s linear infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
    },
    plugins: [
      addVariablesForColors,
      function ({ matchUtilities, theme }) {
        matchUtilities(
          {
            "bg-grid": (value) => ({
              backgroundImage: `url("${svgToDataUri(
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
              )}")`,
            }),
          },
          {
            values: flattenColorPalette(theme("backgroundColor")),
            type: "color",
          },
        );
      },
    ],
  },
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
}
