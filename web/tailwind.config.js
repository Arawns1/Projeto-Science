/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        Light: {
          text: '#020d12',
          background: '#f7fdff',
          secondary: '#00adcd',
          primary: '#41b983',
          'primary-20%': 'hsl(153, 48%, 51%, 0.2)',
          accent: '#7cd75b',
        },
        Dark: {
          primary: '#46be88',
          'primary-30%': 'hsl(153, 48%, 51%,0.3)',
          text: '#edf8fd',
          background: '#00080a',
          accent: '#49a428',
          secondary: '#33e0ff',
        },
        secondaryScale: {
          50: '#eaf9fc',
          100: '#ccf7ff',
          200: '#99f0ff',
          300: '#66e8ff',
          400: '#33e0ff',
          500: '#00d9ff',
          600: '#00adcc',
          700: '#008299',
          800: '#005766',
          900: '#002b33',
          950: '#00161a',
        },
        primaryScale: {
          50: '#ecf8f3',
          100: '#d9f2e7',
          200: '#b4e4ce',
          300: '#8ed7b6',
          400: '#68ca9e',
          500: '#42bd86',
          600: '#35976b',
          700: '#287150',
          800: '#1b4b35',
          900: '#0d261b',
          950: '#07130d',
        },
        accentScale: {
          50: '#effaea',
          100: '#def5d6',
          200: '#bdebad',
          300: '#9de184',
          400: '#7cd75b',
          500: '#5bcd32',
          600: '#49a428',
          700: '#377b1e',
          800: '#245214',
          900: '#12290a',
          950: '#091505',
        },
        backgroundScale: {
          50: '#e5f9ff',
          100: '#ccf2ff',
          200: '#99e6ff',
          300: '#66d9ff',
          400: '#33ccff',
          500: '#00bfff',
          600: '#0099cc',
          700: '#007399',
          800: '#004d66',
          900: '#002633',
          950: '#00131a',
        },
        textScale: {
          50: '#e8f6fc',
          100: '#d1edfa',
          200: '#a3dbf5',
          300: '#75c9f0',
          450: '#47b7eb',
          500: '#19a5e6',
          600: '#1484b8',
          700: '#0f638a',
          800: '#0a425c',
          900: '#05212e',
          950: '#031017',
        },
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        gradient: 'gradient 3s linear infinite ',
      },
      keyframes: {
        gradient: {
          '0%': {
            'background-position': '0 50%',
          },
          '100%': {
            'background-position': '100% 50%',
          },
        },
      },
      fontFamily: {
        sans: 'var(--font-inter)',
        inter: 'Inter',
        trirong: 'Trirong',
      },
      boxShadow: {
        'shadows/1': '0px 1px 3px 0px rgba(0,19,26,0.4)',
        'shadows/2': '0px 5px 12px 0px rgba(0,19,26,0.1)',
        'shadows/3': '0px 4px 12px 0px rgba(0,19,26,0.06)',
        'shadows/4': '0px 10px 15px 0px rgba(0,19,26,0.18)',
        'shadows/5': '0px 12px 34px 0px rgba(0,19,26,0.08)',
        'shadows/6': '0px 20px 20px 0px rgba(0,19,26,0.2)',
        'hover/1': 'inset 9999px 9999px 0px 0px rgba(0,0,0,0.03)',
        'hover/2': 'inset 9999px 9999px 0px 0px rgba(0,0,0,0.02)',
        'hover/3': 'inset 9999px 9999px 0px 0px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        '3xl': 'calc(var(--radius) + 16px)',
        '2xl': 'calc(var(--radius) + 8px)',
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        base: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 6px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
