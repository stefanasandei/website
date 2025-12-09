/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            borderWidth: {
                '6xl': '72rem',
            },
        },
    },
    plugins: [],
}