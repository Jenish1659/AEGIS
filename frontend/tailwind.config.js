/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aegis: {
          bg: '#0B0F19',
          card: '#111827',
          border: '#1F2937',
          accent: '#3B82F6',
          allow: '#10B981',
          block: '#EF4444',
          review: '#F59E0B',
        }
      }
    },
  },
  plugins: [],
}
