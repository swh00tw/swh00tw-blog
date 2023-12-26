import { error } from "@sveltejs/kit";
import { postSchema } from "@/lib/mdsvex/types";
import type { Post } from "@/lib/mdsvex/types";
import type { PageLoadEvent } from "./$types";

export async function load({ params, fetch }: PageLoadEvent) {
	try {
		// post data
		const post = await import(`../../posts/${params.slug}.md`);
		const postsRes = await fetch("api/posts");
		const posts: Post[] = await postsRes.json();
		const meta = postSchema.parse({
			...post.metadata,
			slug: params.slug,
			tags: post.metadata.tags ?? []
		});
		const postIndex = posts.findIndex((p) => p.slug === params.slug);
		const prevSlug = postIndex > 0 ? posts[postIndex - 1].slug : null;
		const nextSlug = postIndex < posts.length - 1 ? posts[postIndex + 1].slug : null;

		// viewer data
		const viewersRes: {
			viewers: number;
		} = await (await fetch(`api/posts/${params.slug}`)).json();

		return {
			content: post.default,
			meta: meta,
			prevSlug,
			nextSlug,
			viewers: viewersRes.viewers
		};
	} catch (e) {
		console.log(e);
		error(404, `Could not find ${params.slug}`);
	}
}
