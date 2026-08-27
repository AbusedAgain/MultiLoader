/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-in': 'slideIn 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'rotate-y': 'rotateY 8s linear infinite',
        'scale-in': 'scaleIn 0.4s ease-out',
        'particle': 'particleFloat 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateZ(0)' },
          '50%': { transform: 'translateY(-10px) translateZ(0)' },
        },
        glow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))' },
          '50%': { filter: 'drop-shadow(0 0 16px rgba(6, 182, 212, 0.8))' },
        },
        slideIn: {
          from: { transform: 'translateX(-20px) translateZ(0)', opacity: '0' },
          to: { transform: 'translateX(0) translateZ(0)', opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        shimmer: {
          from: { transform: 'translateX(-100%) translateZ(0)' },
          to: { transform: 'translateX(100%) translateZ(0)' },
        },
        rotateY: {
          from: { transform: 'perspective(1000px) rotateY(0deg) translateZ(0)' },
          to: { transform: 'perspective(1000px) rotateY(360deg) translateZ(0)' },
        },
        scaleIn: {
          from: { transform: 'scale(0.9) translateZ(0)', opacity: '0' },
          to: { transform: 'scale(1) translateZ(0)', opacity: '1' },
        },
        particleFloat: {
          '0%, 100%': { transform: 'translate(0, 0) translateZ(0)', opacity: '0.2' },
          '50%': { transform: 'translate(10px, -20px) translateZ(0)', opacity: '0.4' },
        },
      },
    },
  },
  plugins: [],
};
