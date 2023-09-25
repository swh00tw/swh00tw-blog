<script lang="ts">
	import type { LexicalNode } from "./types";
	import { getImageInfo, imageNodeSchema } from "./getImageInfo";
	import { cn } from "$lib/cn";
	import LexicalNodes from "./LexicalNodes.svelte";
	import ImageLoader from "$lib/components/ImageLoader/index.svelte";

	export let node: LexicalNode;
	const imageNodeRes = imageNodeSchema.safeParse(node);
	const imageInfo = getImageInfo(node);
</script>

{#if imageInfo}
	<div class={cn("my-12", "flex", "flex-col", "items-center")}>
		<ImageLoader
			src={imageInfo.url}
			alt={imageInfo.url + "imageAlt"}
			wrapperClass="lg:w-[calc(100vw*0.6*0.72)] lg:h-[calc(100vw*0.6*0.72*9/16)] md:w-[calc(100vw*0.8*0.72)] md:h-[calc(100vw*0.8*0.72*9/16)] w-[calc(100vw*0.72)] h-[calc(100vw*0.72*9/16)] bg-background"
		/>
		<p class={cn("text-[#808080]", "text-[12px]")}>
			{#if imageNodeRes.success}
				<LexicalNodes nodes={imageNodeRes.data.caption.editorState.root.children} />
			{/if}
		</p>
	</div>
{/if}
