/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef0f6',
          100: '#d0d5e8',
          200: '#a1aad1',
          300: '#7280bb',
          400: '#4355a4',
          500: '#212d55',
          600: '#1a2444',
          700: '#131b33',
          800: '#0d1222',
          900: '#060911',
          DEFAULT: '#212d55',
        },
        electric: {
          50: '#e6f3fc',
          100: '#bde0f7',
          200: '#7fc2ef',
          300: '#41a4e7',
          400: '#1a88d8',
          500: '#0c71b9',
          600: '#0a5d97',
          700: '#084975',
          800: '#053454',
          900: '#031f32',
          DEFAULT: '#0c71b9',
        },
        brand: {
          orange: '#ea570d',
          'orange-light': '#f47a3d',
          'orange-dark': '#c44609',
          navy: '#212d55',
          blue: '#0c71b9',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-right': 'slideRight 0.6s ease-out forwards',
        'slide-left': 'slideLeft 0.6s ease-out forwards',
        'count-up': 'countUp 2s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spinReverse 25s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marqueeReverse 30s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'bounce-slow': 'bounceSlow 3s ease-in-out infinite',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'rotate-3d': 'rotate3d 15s linear infinite',
        'wave': 'wave 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        rotate3d: {
          '0%': { transform: 'rotateY(0deg) rotateX(0deg)' },
          '100%': { transform: 'rotateY(360deg) rotateX(360deg)' },
        },
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-15deg)' },
          '75%': { transform: 'rotate(15deg)' },
        },
      },
      backgroundImage: {
        'gradient-navy': 'linear-gradient(135deg, #212d55 0%, #1a2444 50%, #0c71b9 100%)',
        'gradient-orange': 'linear-gradient(135deg, #ea570d 0%, #c44609 100%)',
        'gradient-blue': 'linear-gradient(135deg, #0c71b9 0%, #084975 100%)',
        'gradient-kinetic': 'linear-gradient(135deg, #212d55, #0c71b9, #ea570d, #0c71b9, #212d55)',
      },
      boxShadow: {
        'brand': '0 4px 24px rgba(33, 45, 85, 0.15)',
        'brand-lg': '0 8px 48px rgba(33, 45, 85, 0.2)',
        'orange': '0 4px 24px rgba(234, 87, 13, 0.3)',
        'blue': '0 4px 24px rgba(12, 113, 185, 0.3)',
        'glow-orange': '0 0 40px rgba(234, 87, 13, 0.4)',
        'glow-blue': '0 0 40px rgba(12, 113, 185, 0.4)',
      },
    },
  },
  plugins: [],
};
