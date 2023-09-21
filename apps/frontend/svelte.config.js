import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		env: {
			dir: "."
		},
		alias: {
			$houdini: "./$houdini",
			"@": "./src"
		},
		csp: {
			directives: {
				"script-src": ["self"]
			},
			reportOnly: {
				"script-src": ["self"],
				"report-uri": [""]
			}
		}
	}
};

export default config;
