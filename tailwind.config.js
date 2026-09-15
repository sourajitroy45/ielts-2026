/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm "beige & deep brown" study-desk theme. `base` is the
        // surface scale (light -> more recessed), `slate` is repurposed
        // as the text scale (dark brown -> muted tan), and `amber` is
        // repurposed as the accent scale (deep coffee brown). Overriding
        // Tailwind's built-in slate/amber here re-themes every existing
        // `text-slate-*` / `bg-amber-*` utility across the app from one
        // place, without touching each component.
        base: {
          950: '#f1e6d0', // page background — warm beige
          900: '#f8f1e2', // card/panel background — light cream
          850: '#efe1c4', // recessed surface (inputs, hover)
          800: '#e6d3ab', // hover / active surface
          700: '#d3b98c', // borders
          600: '#c2a374', // stronger borders / dividers
        },
        slate: {
          100: '#2b1d10', // primary text — deep brown, near-black
          200: '#3a2817',
          300: '#4d3820', // body text
          400: '#6b5539', // secondary / muted labels
          500: '#8a7355', // dim text, timestamps
          600: '#a89572', // faintest muted text
        },
        amber: {
          300: '#a9713c', // lighter accent
          400: '#8a5a2b', // primary accent text/icon — deep coffee brown
          500: '#6b4423', // primary accent fill (buttons) — espresso brown
          600: '#54350f', // pressed/darker accent
        },
        // Earth-tone family used for per-section icon accents (Reading,
        // Listening, Speaking, Vocabulary) so the whole app stays warm
        // instead of mixing in the old cool blue/indigo/pink defaults.
        terracotta: { 400: '#b5651d', 500: '#9c5518' },
        olive: { 400: '#7a8c4c', 500: '#606f3a' },
        clay: { 400: '#a15c46', 500: '#853f2c' },
        sage: { 400: '#6f8a72', 500: '#576e5a' },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Inter', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
