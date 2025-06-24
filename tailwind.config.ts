
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        neonCyan: '#00FFFF',
        neonPink: '#FF00FF',
      },
      boxShadow: {
        neon: '0 0 15px rgba(0, 255, 255, 0.5), 0 0 25px rgba(255, 77, 166, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
