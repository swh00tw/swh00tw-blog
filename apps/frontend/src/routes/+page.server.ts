import type { PageServerLoad } from "./$types";
import { getGraphQLClient } from "$lib/graphql";
import { gql } from "@urql/svelte";

const getAllPosts = gql`
	query Test {
		Posts {
			docs {
				title
				id
			}
		}
	}
`;

export const load: PageServerLoad = async ({ params, fetch }) => {
	const client = getGraphQLClient({ fetch });
	const queryResult = await client
		.query(getAllPosts, {})
		.toPromise()
		.then((res) => res.data)
		.catch((err) => {
			console.error(err);
		});

	return {
		queryResult
	};
};
