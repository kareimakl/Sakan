/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#255685",
        white: "#FFFFFF",
        text: "#BEBEBE",
        button: "#59C85E",
        backgroundButton: "#F5683DE5",
        redirectButton: "#AA2117",
        linkButton: "#72B3FF"
      },
    },
  },
  plugins: [],
};
