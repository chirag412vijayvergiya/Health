/** @type {import('tailwindcss').Config} */
//eslint-disable-next-line
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // This darkMode: 'class' is going because there is a prefix dark: which is used in darkmode
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Grey
        'grey-0': '#fff',
        'grey-50': '#f9fafb',
        'grey-100': '#f3f4f6',
        'grey-200': '#e5e7eb',
        'grey-300': '#d1d5db',
        'grey-400': '#9ca3af',
        'grey-500': '#6b7280',
        'grey-600': '#4b5563',
        'grey-700': '#2B2B2B',
        'grey-800': '#1f1f1f',
        'grey-900': '#111827',

        // Blue
        'blue-100': '#e0f2fe',
        'blue-700': '#0369a1',

        // Green
        'green-100': '#dcfce7',
        'green-700': '#15803d',

        // Yellow
        'yellow-100': '#fef9c3',
        'yellow-700': '#a16207',

        // Silver
        'silver-100': '#e5e7eb',
        'silver-700': '#374151',

        // Indigo
        // Brand colors
        'brand-50': '#eef2ff',
        'brand-100': '#e0e7ff',
        'brand-200': '#c7d2fe',
        'brand-500': '#6366f1',
        'brand-600': '#4f46e5',
        'brand-700': '#4338ca',
        'brand-800': '#3730a3',
        'brand-900': '#312e81',

        // Red
        'red-100': '#fee2e2',
        'red-700': '#b91c1c',
        'red-800': '#991b1b',
      },
      borderRadius: {
        // Custom border radius values
        tiny: '3px',
        sm: '5px',
        md: '7px',
        lg: '9px',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
        md: '0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06)',
        lg: '0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)',
      },
      gridTemplateColumns: {
        16: '3fr 2fr',

        // Complex site-specific column configuration
        footer: '200px minmax(900px, 1fr) 100px',
      },
    },
  },
  plugins: [],
};
