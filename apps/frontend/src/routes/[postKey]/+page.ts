import { graphql, load_AllPosts } from "$houdini";
import { encodePostKey } from "@/lib/encodePostKey";
import type { PageLoad } from "../$types";
import { get } from "svelte/store";
import { error } from "@sveltejs/kit";

export const _houdini_load = graphql`
	query PagePost($id: String!) {
		Post(id: $id) {
			id
			title
			description
			publishedDate
			tags {
				name
			}
			content
			coverImage {
				id
				sizes {
					thumbnail {
						url
					}
					background {
						url
					}
				}
			}
		}
		Posts {
			docs {
				id
				title
			}
		}
	}
`;

export const _PagePostVariables: PageLoad = async (event) => {
	const { AllPosts } = await load_AllPosts({ event });
	const posts = get(AllPosts);
	const key = (event.params as { postKey: string }).postKey;
	const id = posts.data?.Posts?.docs?.find((post) => post && encodePostKey(post.title) === key)?.id;
	if (!id) {
		throw error(404, "Post not found");
	}
	return {
		id
	};
};
