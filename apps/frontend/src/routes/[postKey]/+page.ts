import { graphql, load_AllPosts } from "$houdini";
import { encodePostKey } from "@/lib/encodePostKey";
import type { PageLoad } from "../$types";
import { get } from "svelte/store";
import { error } from "@sveltejs/kit";
import { PUBLIC_FRONTEND_ENV } from "$env/static/public";

export const _houdini_load = graphql`
	query PagePost($id: String!, $postWhereInput: Post_where!) {
		Post(id: $id) {
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
		Posts(where: $postWhereInput) {
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
		variables: {
			postWhereInput: {
				_status: {
					in: PUBLIC_FRONTEND_ENV === "dev" ? ["draft", "published"] : ["published"]
				}
			}
		}
	});
	const posts = get(AllPosts);
	const key = (event.params as { postKey: string }).postKey;
	const id = posts.data?.Posts?.docs?.find(
		(post) => post && encodePostKey(post?.title ?? "") === key
	)?.id;
	if (!id) {
		throw error(404, "Post not found");
	}
	return {
		id,
		postWhereInput: {
			_status: {
				in: PUBLIC_FRONTEND_ENV === "dev" ? ["draft", "published"] : ["published"]
			}
		}
	};
};
