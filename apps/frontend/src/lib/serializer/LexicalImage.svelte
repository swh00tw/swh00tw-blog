<script lang="ts">
	import type { LexicalNode } from "./types";
	import { getImageInfo, imageNodeSchema } from "./getImageInfo";
	import { cn } from "$lib/cn";
	import LexicalNodes from "./LexicalNodes.svelte";
	export let node: LexicalNode;
	const imageNodeRes = imageNodeSchema.safeParse(node);
	const imageInfo = getImageInfo(node);
</script>

{#if imageInfo}
	<div class={cn("my-12", "flex", "flex-col", "items-center")}>
		<img src={imageInfo.url} alt={imageInfo.url + "imageAlt"} />
		<p class={cn("text-[#808080]", "text-[12px]")}>
			{#if imageNodeRes.success}
				<LexicalNodes nodes={imageNodeRes.data.caption.editorState.root.children} />
			{/if}
		</p>
	</div>
{/if}
