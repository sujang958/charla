/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,svelte}',
	],
  theme: {
  fontFamily: {
    pretendard: ["Pretendard Variable", "Noto Sans KR", "sans-serif"]
  }
  },
  plugins: [require("@tailwindcss/forms")],
}