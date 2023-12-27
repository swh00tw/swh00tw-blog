import type { Post } from "$lib/mdsvex/types";
import { db } from "$lib/supabaseClient";
import type { PageLoadEvent } from "./$types";

async function getViewers(): Promise<Record<string, number>> {
	const { data, error } = await db.from("posts").select();
	if (error) {
		console.error(error);
		return {};
	}
	return data.reduce((acc, { slug, viewers }) => {
		return {
			...acc,
			[slug]: viewers
		};
	}, {});
}

export async function load({ fetch }: PageLoadEvent) {
	const response = await fetch("api/posts");
	const posts: Post[] = await response.json();
	const viewers = await getViewers();
	return { posts, viewers };
}
