// Ensure package.json includes "type": "module" at the top level:
// {
//   "type": "module",
//   ...
// }

/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite/plugin';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.js", 
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite],
}
