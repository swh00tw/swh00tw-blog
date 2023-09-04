<script lang="ts">
	import type { PageData } from "./$houdini";
	import { cn } from "$lib/cn";

	export let data: PageData;
	$: ({ PagePost } = data);
	$: console.log("pagepost: ", $PagePost);
</script>

{#if $PagePost?.data?.Post}
	<div class={cn("relative")}>
		<img
			src={$PagePost.data.Post.coverImage.sizes?.background?.url}
			alt={`${$PagePost.data.Post.title}-coverImage`}
			class={cn("absolute", "top-[-50px]", "left-0", "w-full", "z-[-2]")}
		/>
		<div
			class={cn(
				"bg-gradient-to-t",
				"from-background",
				"from-[18.97%]",
				"to-[#24242490]",
				"to-100%",
				"z-[-1]",
				"absolute",
				"inset-0",
				"h-[calc(100vw*9/16)]"
			)}
		/>
	</div>
{:else}
	<h1>Data is not available</h1>
{/if}
