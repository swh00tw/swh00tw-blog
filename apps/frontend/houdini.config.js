/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
	watchSchema: {
		url: "http://localhost:3000/api/graphql/"
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
