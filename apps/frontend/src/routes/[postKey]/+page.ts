import { graphql, load_AllPosts } from "$houdini";
import { encodePostKey } from "@/lib/encodePostKey";
import type { PageLoad } from "../$types";
import { get } from "svelte/store";
import { error } from "@sveltejs/kit";
import { PUBLIC_FRONTEND_ENV } from "$env/static/public";

export const _houdini_load = graphql`
	query PagePost($id: String!, $draft: Boolean!) {
		Post(id: $id, draft: $draft) {
			id
			title
			description
			publishedDate
			content
			coverImage {
				id
				sizes {
					background {
						url
					}
				}
			}
		}
		Posts(draft: $draft) {
			docs {
				id
				title
			}
		}
	}
`;

export const _PagePostVariables: PageLoad = async (event) => {
	const { AllPosts } = await load_AllPosts({
		event,
		variables: { draft: PUBLIC_FRONTEND_ENV === "dev" }
	});
	const posts = get(AllPosts);
	const key = (event.params as { postKey: string }).postKey;
	const id = posts.data?.Posts?.docs?.find((post) => post && encodePostKey(post.title) === key)?.id;
	if (!id) {
		throw error(404, "Post not found");
	}
	return {
		id,
		draft: PUBLIC_FRONTEND_ENV === "dev"
	};
};
