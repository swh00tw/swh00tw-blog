import { HoudiniClient } from "$houdini";
import { PUBLIC_FRONTEND_GQL_API_ENDPOINT } from "$env/static/public";

export default new HoudiniClient({
	url: PUBLIC_FRONTEND_GQL_API_ENDPOINT
	// uncomment this to configure the network call (for things like authentication)
	// for more information, please visit here: https://www.houdinigraphql.com/guides/authentication
	// fetchParams({ session }) {
	//     return {
	//         headers: {
	//             Authentication: `Bearer ${session.token}`,
	//         }
	//     }
	// }
});
