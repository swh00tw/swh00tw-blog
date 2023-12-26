import { json } from "@sveltejs/kit";
import { postSchema } from "$lib/mdsvex/types";
import type { Post } from "$lib/mdsvex/types";
import { PUBLIC_FRONTEND_ENV } from "$env/static/public";

async function getPosts() {
	let posts: Post[] = [];

	const paths = import.meta.glob("/src/posts/*.md", { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split("/").at(-1)?.replace(".md", "");

		if (file && typeof file === "object" && "metadata" in file && slug) {
			const metadata = file.metadata as Omit<Post, "slug">;
			const post = { ...metadata, slug, tags: metadata.tags ?? [] };
			const parseRes = postSchema.safeParse(post);
			if (parseRes.success && !(PUBLIC_FRONTEND_ENV === "prod" && !post.published)) {
				posts.push(post);
			} else if (!parseRes.success) {
				console.log(parseRes.error);
			}
		}
	}

	posts = posts.sort(
		(first, second) =>
			new Date(second.publishedAt).getTime() - new Date(first.publishedAt).getTime()
	);

	return posts;
}

export async function GET({ setHeaders }) {
	const posts = await getPosts();
	setHeaders({ "Cache-Control": "public, max-age=36000" });
	return json(posts);
}
