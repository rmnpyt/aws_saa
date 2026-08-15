import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aws: {
          orange: '#FF9900',
          'orange-dark': '#E88B00',
          blue: '#232F3E',
        },
        domain: {
          1: '#2563EB',
          2: '#16A34A',
          3: '#7C3AED',
          4: '#D97706',
          0: '#64748B',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Fira Code', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '72ch',
            code: {
              backgroundColor: 'rgb(241 245 249)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: '400',
            },
            'code::before': { content: '' },
            'code::after': { content: '' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
