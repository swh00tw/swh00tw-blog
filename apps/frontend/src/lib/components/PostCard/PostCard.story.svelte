<script lang="ts">
	import type { Hst } from "@histoire/plugin-svelte";
	import PostCard from "$lib/components/PostCard/index.svelte";
	export let Hst: Hst;

	let coverImgSrc = "http://localhost:3000/media/test-800x450.png";
	let publishedAt = "2023-07-22T16:00:00.000Z";
	let title = "SOLID principle in React";
	let tags = ["React"];
	let description =
		"Maintainability & Scalability Matter Maintainability & Scalability Matter Maintainability & Scalability Matter";
	let readingTime = 5;
	$: props = {
		coverImgSrc,
		publishedAt,
		title,
		tags,
		description,
		readingTime
	};
</script>

<Hst.Story title="PostCard">
	<PostCard {...props} />
</Hst.Story>
