import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: "localhost",
		port: 5173, // Port change karne ke liye 5173 ke jagah kuch aur bhi use kar sakte ho
		open: true, // Browser automatically open karega
		proxy: {
			"/api": {
				target: "http://localhost:1000", // Backend server ka address
				changeOrigin: true,
				secure: false, // Agar HTTP use kar rahe ho toh secure false rakhein
			},
		},
	},
});
