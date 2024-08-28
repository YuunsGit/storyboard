/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {
				'2xl': '1600px'
			},
			colors: {
				musk: '#42B52E'
			}
		},
		fontFamily: {
			sans: ['Inter', 'sans-serif']
		}
	},
	plugins: []
};
