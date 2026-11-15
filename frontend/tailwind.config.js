/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#FAF8F5',
          subtle: '#F4F1EA',
          card: '#FFFFFF',
        },
        brand: {
          50: '#F5F4FC',
          100: '#EBEAF8',
          200: '#D5D3F2',
          300: '#B4B1E7',
          400: '#9895DD',
          500: '#7A78C9',
          600: '#6B69BE',
          700: '#5654A2',
          800: '#454383',
          900: '#39386C',
        },
        charcoal: {
          DEFAULT: '#23232F',
          dark: '#1E1E24',
          light: '#353545',
        },
        muted: {
          DEFAULT: '#6B6B7B',
          light: '#8E8E9E',
          lighter: '#B2B2C0',
          border: '#E6E4DF',
        },
        // Semantic payment & status colors
        status: {
          pending: {
            bg: '#FEF9C3',
            text: '#854D0E',
            border: '#FEF08A',
            dot: '#EAB308',
          },
          confirmed: {
            bg: '#EEF2FF',
            text: '#4338CA',
            border: '#C7D2FE',
            dot: '#6366F1',
          },
          checkedin: {
            bg: '#CCFBF1',
            text: '#115E59',
            border: '#99F6E4',
            dot: '#14B8A6',
          },
          cancelled: {
            bg: '#F1F5F9',
            text: '#475569',
            border: '#CBD5E1',
            dot: '#94A3B8',
          },
        },
        payment: {
          paid: {
            bg: '#D1FAE5',
            text: '#065F46',
            border: '#A7F3D0',
            dot: '#10B981',
          },
          partial: {
            bg: '#FEF3C7',
            text: '#92400E',
            border: '#FDE68A',
            dot: '#F59E0B',
          },
          unpaid: {
            bg: '#FFE4E6',
            text: '#9F1239',
            border: '#FECDD3',
            dot: '#F43F5E',
          },
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'card': '0 2px 8px -2px rgba(35, 35, 47, 0.05), 0 8px 16px -4px rgba(35, 35, 47, 0.04)',
        'card-hover': '0 4px 12px -2px rgba(122, 120, 201, 0.12), 0 12px 24px -4px rgba(35, 35, 47, 0.08)',
        'pill': '0 1px 3px rgba(35, 35, 47, 0.06)',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.125rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
