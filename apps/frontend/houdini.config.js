/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
	watchSchema: {
		url: "https://swh00tw-blog-production.up.railway.app/api/graphql/"
	},
	plugins: {
		"houdini-svelte": {}
	},
	scalars: {
		DateTime: {
			type: "string"
		},
		JSON: {
			type: "Record<string, unknown>"
		}
	}
};

export default config;
