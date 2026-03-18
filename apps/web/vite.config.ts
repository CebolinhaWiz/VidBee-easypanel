import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import packageJson from "./package.json";

const config = defineConfig({
	define: {
		__APP_VERSION__: JSON.stringify(packageJson.version),
	},
	plugins: [
		devtools({
			eventBusConfig: {
				enabled: false,
			},
		}),
		tsconfigPaths({ projects: ["./tsconfig.json"] }),
		Icons({
			compiler: "jsx",
			jsx: "react",
		}),
		tailwindcss(),
		tanstackStart(),
		viteReact(),
	],
	server: {
		proxy: {
			"/events": {
				target: "http://api:3100", // 🔥 troquei localhost
				changeOrigin: true,
			},
			"/rpc": {
				target: "http://api:3100",
				changeOrigin: true,
			},
			"/images": {
				target: "http://api:3100",
				changeOrigin: true,
			},
		},
	},

	// 🔥 ADICIONA ISSO AQUI
	preview: {
		host: true,
		port: 3000,
		allowedHosts: "all",
	},

	ssr: {
		noExternal: ["@vidbee/i18n"],
	},
});

export default config;
