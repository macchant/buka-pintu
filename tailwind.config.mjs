/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Solstice brand palette
        solstice: {
          bg: '#0f0f12',
          surface: 'rgba(255,255,255,0.03)',
          border: 'rgba(232,213,183,0.12)',
          muted: '#9a9080',
        },
        midnight: {
          start: '#1a1a2e',
          end: '#16213e',
        },
        cream: {
          DEFAULT: '#e8d5b7',
          dark: '#c9a96e',
          light: '#f5f0e8',
        },
        brand: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          950: '#431407',
        },
        forest: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
          950: '#022C22',
        },
        warm: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
        },
        contrast: {
          orange: '#DC4A00',
          green: '#0D8A3E',
        },
        // Enhanced gray scale for dark mode
        gray: {
          750: '#1f2937', // Custom dark mode intermediate
          850: '#111827', // Custom dark mode darker
          950: '#030712', // Custom dark mode darkest
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        heading: ['Fraunces', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'heading': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        'mobile-section': '1.5rem',
        'mobile-card': '1rem',
      },
      backgroundImage: {
        'midnight-gradient': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        'cream-gradient': 'linear-gradient(135deg, #e8d5b7 0%, #c9a96e 100%)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delay': 'float 5s ease-in-out infinite 1s',
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-delay': 'fadeIn 0.6s ease-out 0.2s both',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-up-delay': 'slideUp 0.6s ease-out 0.2s both',
        'slide-up-delay-2': 'slideUp 0.6s ease-out 0.4s both',
        'slide-up-delay-3': 'slideUp 0.6s ease-out 0.6s both',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-slow': 'glow 4s ease-in-out infinite alternate',
        'scale-in': 'scaleIn 0.3s ease-out',
        'orb': 'orb 8s ease-in-out infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'spin-slow': 'spin 20s linear infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(232, 213, 183, 0.15)' },
          '100%': { boxShadow: '0 0 40px rgba(232, 213, 183, 0.3)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        orb: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -30px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
        },
      },
      boxShadow: {
        'glow-cream': '0 0 30px rgba(232, 213, 183, 0.25)',
        'glow-cream-lg': '0 0 60px rgba(232, 213, 183, 0.3)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.3)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.5)',
        'card-lift': '0 12px 40px -12px rgba(0, 0, 0, 0.25)',
        'inner-glow': 'inset 0 1px 0 rgba(232, 213, 183, 0.1)',
        'glow-btn': '0 8px 24px -4px rgba(234, 88, 12, 0.3)',
        'glow-btn-hover': '0 12px 32px -4px rgba(234, 88, 12, 0.4)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      transitionTimingFunction: {
        'bounce-subtle': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
