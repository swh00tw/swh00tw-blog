import { Client, cacheExchange, fetchExchange, type ClientOptions } from "@urql/svelte";
import { FRONTEND_GQL_API_ENDPOINT } from "$env/static/private";

type OptionType = Omit<ClientOptions, "url" | "exchanges">;

export function getGraphQLClient(options: OptionType) {
	return new Client({
		url: FRONTEND_GQL_API_ENDPOINT,
		exchanges: [cacheExchange, fetchExchange],
		...options
	});
}
