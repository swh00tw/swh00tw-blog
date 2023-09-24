import { graphql, AllPostsStore } from "$houdini";
import { encodePostKey } from "@/lib/encodePostKey";
import type { PageLoad } from "../$types";
import { error } from "@sveltejs/kit";
import { PUBLIC_FRONTEND_ENV } from "$env/static/public";

export const _houdini_load = graphql`
	query PagePost($id: String!, $postWhereInput: Post_where!) {
		Post(id: $id, draft: true) {
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
		Posts(where: $postWhereInput, draft: true) {
			docs {
				id
				title
			}
		}
	}
`;

export const _PagePostVariables: PageLoad = async (event) => {
	const allPostsStore = new AllPostsStore();
	const { data: allPostsData } = await allPostsStore.fetch({
		event,
		variables: {
			postWhereInput: {
				_status: {
					in: PUBLIC_FRONTEND_ENV === "dev" ? ["draft", "published"] : ["published"]
				}
			}
		}
	});
	const key = (event.params as { postKey: string }).postKey;
	const id = allPostsData?.Posts?.docs?.find(
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
