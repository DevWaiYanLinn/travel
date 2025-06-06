/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors:{
                primary:"#81b0ff",
                "white-50": "rgba(255, 255, 255, 0.6)"
            }
        },
    },
    plugins: [],
};
