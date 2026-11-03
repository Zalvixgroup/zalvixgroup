import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "#1D4ED8",
          hover: "#1E40AF",
          light: "#EFF6FF",
        },
        accent: {
          emerald: "#16A34A",
          emeraldLight: "#DCFCE7",
          amber: "#D97706",
          amberLight: "#FEF3C7",
        },
        action: {
          whatsapp: "#25D366",
          whatsappHover: "#1EBE5D",
          call: "#2563EB",
          book: "#EA580C",
        },
        canvas: "#F8FAFC",
        surface: "#FFFFFF",
        borderSlate: "#E2E8F0",
      },
    },
  },
  plugins: [],
};
export default config;
