<script lang="ts">
	import type { PageData } from "./$houdini";
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
