<script lang="ts">
	import Tag from "@/lib/components/Tag/index.svelte";
	import IntroCard from "@/lib/components/IntroCard/index.svelte";
	import type { PageData } from "./$houdini";
	import { cn } from "@/lib/cn";
	import Footer from "@/lib/components/Footer/index.svelte";
	import PostCard from "@/lib/components/PostCard/index.svelte";
	export let data: PageData;

	$: ({ AllPosts } = data);
	$: console.log(AllPosts);

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

<h1>Welcome to SvelteKit</h1>
{#each $AllPosts.data?.Posts?.docs ?? [] as post}
	<h2><a href="post/{post?.id ?? '??'}">{post?.title}</a></h2>
	<p>{post?.coverImage?.sizes?.thumbnail?.url ?? ""}</p>
{/each}
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Tag content="123" />
<div class={cn("m-4", "flex", "justify-center")}>
	<IntroCard />
</div>
<Footer />
<div class="mx-8">
	<PostCard {...props} />
</div>
