/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				text: "#ffffff",
				background: "#242424",
				accent: "#9F3AE0",
				border: "#3e3e3e",
				text02: "#bbbbbb",
				primary: "#7D00C9",
				secondary: "#2E2E2E"
			},
			fontFamily: {
				dmSans: ["DM Sans", "sans-serif"],
				workSans: ["Work Sans Variable", "sans-serif"]
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))"
			}
		}
	},
	plugins: []
};
