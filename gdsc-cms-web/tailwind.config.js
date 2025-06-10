/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "node_modules/flowbite-react/lib/esm/**/*.js",
    ],
    theme: {
        extend: {
            colors: {
                "primary-blue": "#1F87FC",
                "secondary-blue": "#E2E2F2",
                "primary-red": "#FE2B25",
                "primary-green": "#00A050",
                "primary-yellow": "#FFB900",
                "primary-gray": "#666C73",
                "secondary-gray": "#D9D9D9",
            },
            height: {
                main: "calc(100vh - 70px)",
                dashboard: "calc(100vh - 75px)",
            },
            boxShadow: {
                task: "8px 8px 13px 4px rgba(226, 226, 242)",
            },
        },
    },
    // eslint-disable-next-line no-undef
    plugins: [require("flowbite/plugin")],
};
