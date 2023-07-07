/** @type {import('tailwindcss').Config} */
export default {
 content: ['./src/**/*.{html,js,svelte,ts}', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        'pretendard': ["Pretendard Variable", "Noto Sans KR", "sans-serif"]
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
}

