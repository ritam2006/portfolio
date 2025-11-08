/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-bg': 'var(--accent-bg)',
        'accent-bg-hover': 'var(--accent-bg-hover)',
        'accent-pink': 'var(--accent-pink)',
        muted: 'var(--muted)',
        border: 'var(--border)',
      },      
    },
  },
  plugins: [],
}