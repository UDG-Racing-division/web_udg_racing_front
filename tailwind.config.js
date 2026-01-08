
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        racing: ['Racing Sans One', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        'udg-blue': {
          DEFAULT: '#2d4a8e',
          light: '#3d5ba8',
          dark: '#1d3a7e',
          darker: '#0d2a6e',
        },
        'accent-cyan': '#00d4ff',
        'accent-blue-bright': '#4a90ff',
        'accent-electric': '#00ffff',
        gray: {
          DEFAULT: '#9ca3af',
        },
      },
      backgroundImage: {
        'gradient-blue': 'linear-gradient(135deg, #1d3a7e 0%, #2d4a8e 50%, #3d5ba8 100%)',
        'gradient-blue-radial': 'radial-gradient(circle at center, #2d4a8e 0%, #0d2a6e 100%)',
      },
      boxShadow: {
        'glow-blue': '0 0 30px rgba(45, 74, 142, 0.4)',
        'glow-cyan': '0 0 30px rgba(0, 212, 255, 0.3)',
      },
    },
  },
  plugins: [],
}
