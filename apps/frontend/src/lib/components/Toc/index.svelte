<script lang="ts" context="module">
	export interface Title {
		text: string;
		indent: number;
		tag: "h1" | "h2" | "h3";
	}
</script>

<script lang="ts">
	import { notEmpty } from "@/lib/notEmpty";
	import type { LexicalNode } from "@/lib/serializer/types";
	import { cn } from "$lib/cn";
	import Node from "./Node.svelte";
	import { onMount } from "svelte";
	import { initCurrSection, currSection } from "./currSection";
	export let nodes: LexicalNode[];
	export let pageId: string | undefined;

	export let isSticky: boolean;
	let leftOffset = "left-0";
	let el: HTMLDivElement | null = null;
	onMount(() => {
		leftOffset = `left-${el?.offsetLeft ?? 0}`;
		if (pageId) {
			const titles = getTitles(nodes);
			initCurrSection(
				pageId,
				titles.map((t) => t.text)
			);
		}
	});

	function getTitles(nodes: LexicalNode[]): Title[] {
		if (!nodes) return [];
		let minIndent = Infinity;
		const titles = nodes
			.filter((node) => node.type === "heading" && ["h1", "h2", "h3"].includes(node?.tag ?? ""))
			.filter((node) => notEmpty(node?.children?.[0]?.text));
		for (const title of titles) {
			const indent = title.tag === "h1" ? 0 : title.tag === "h2" ? 1 : 2;
			minIndent = Math.min(minIndent, indent);
		}
		return titles.map((title) => ({
			indent: (title.tag === "h1" ? 0 : title.tag === "h2" ? 1 : 2) - minIndent,
			text: title?.children?.[0].text as string,
			tag: title?.tag as "h1" | "h2" | "h3"
		}));
	}
</script>

<div
	class={cn(
		"flex",
		"w-[calc(100svw*0.15)]",
		"flex-col",
		"gap-[10px]",
		"transition-all",
		"ease-in-out",
		{
			fixed: isSticky,
			"top-[100px]": isSticky,
			leftOffset: isSticky
		}
	)}
	bind:this={el}
>
	<div class={cn("text-[14px]", "font-bold")}>Table Of Content</div>
	{#each getTitles(nodes) as title}
		<Node {title} {pageId} />
	{/each}
</div>
