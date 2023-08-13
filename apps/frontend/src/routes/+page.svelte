<script lang="ts">
	import Tag from "@/lib/components/Tag/index.svelte";
	import IntroCard from "@/lib/components/IntroCard/index.svelte";
	import type { PageData } from "./$houdini";
	import { cn } from "@/lib/cn";
	export let data: PageData;

	$: ({ AllPosts } = data);
	$: console.log(AllPosts);
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
