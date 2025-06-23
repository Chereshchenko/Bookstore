/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      screens: {
        "xs": "300px",  
        "sm": "600px",
        "msm": "700px",    
        "md": "900px",
        "lg": "1200px",
        "xl": "1536px",
      },
    },
  },
  plugins: [],
}