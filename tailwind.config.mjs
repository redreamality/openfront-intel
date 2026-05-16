/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        military: {
          50: '#f4f5f0',
          100: '#e6e8d8',
          200: '#cdd2b3',
          300: '#a8b282',
          400: '#84905a',
          500: '#677443',
          600: '#4d7c0f',
          700: '#3f5a29',
          800: '#374822',
          900: '#2d3a1d',
          950: '#171f0e',
        },
        cannon: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
        },
        iron: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5dae3',
          300: '#b0b9ca',
          400: '#8693ac',
          500: '#677694',
          600: '#525f79',
          700: '#434e62',
          800: '#3a4253',
          900: '#1f2937',
          950: '#0b0f17',
        },
        alert: {
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
      },
      fontFamily: {
        sans: ['"Inter"', '"PingFang SC"', '"Microsoft YaHei"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      typography: ({ theme }) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.iron.200'),
            '--tw-prose-headings': theme('colors.cannon.400'),
            '--tw-prose-links': theme('colors.cannon.500'),
            '--tw-prose-bold': theme('colors.iron.50'),
            '--tw-prose-code': theme('colors.military.300'),
            '--tw-prose-pre-bg': theme('colors.iron.950'),
            '--tw-prose-quotes': theme('colors.iron.300'),
            '--tw-prose-quote-borders': theme('colors.cannon.700'),
            '--tw-prose-hr': theme('colors.iron.800'),
            '--tw-prose-th-borders': theme('colors.iron.700'),
            '--tw-prose-td-borders': theme('colors.iron.800'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
