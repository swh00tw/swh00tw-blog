import { graphql } from "$houdini";
import type { PageLoad } from "./$types";
import { PUBLIC_FRONTEND_ENV } from "$env/static/public";

export const _houdini_load = graphql`
	query AllPosts($postWhereInput: Post_where!) {
		Posts(where: $postWhereInput) {
			docs {
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
					}
				}
			}
		}
	}
`;

export const _AllPostsVariables: PageLoad = async () => {
	return {
		postWhereInput: {
			_status: {
				in: PUBLIC_FRONTEND_ENV === "dev" ? ["draft", "published"] : ["published"]
			}
		}
	};
};
