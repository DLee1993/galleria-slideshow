/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                libre: ["Libre Baskerville", "serif"],
            },
            colors: {
                black: "#000000",
                grey: "#7d7d7d",
                lightGrey: "#e5e5e5",
                silver: "#f3f3f3",
                white: "#ffffff",
            },
        },
        fluidTypography: {},
    },
    // eslint-disable-next-line no-undef
    plugins: [require("tailwind-fluid-typography")],
};
