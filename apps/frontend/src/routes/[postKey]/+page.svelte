<script lang="ts">
	import type { PageData } from "./$houdini";
	import { cn } from "$lib/cn";
	import Headerbar from "@/lib/components/Headerbar/index.svelte";

	export let data: PageData;
	$: ({ PagePost } = data);
</script>

{#if $PagePost?.data?.Post}
	<div class={cn("relative")}>
		<img
			src={$PagePost.data.Post.coverImage.sizes?.background?.url}
			alt={`${$PagePost.data.Post.title}-coverImage`}
			class={cn("absolute", "top-[60px]", "md:top-0", "left-0", "w-full", "z-[-2]")}
		/>
		<div
			class={cn(
				"bg-gradient-to-t",
				"from-background",
				"from-[15.97%]",
				"to-[#24242490]",
				"to-100%",
				"z-[-1]",
				"absolute",
				"inset-0",
				"top-[60px]",
				"md:top-0",
				"h-[calc(100vw*9/16)]"
			)}
		/>
		<Headerbar />
	</div>
{:else}
	<h1>Data is not available</h1>
{/if}
