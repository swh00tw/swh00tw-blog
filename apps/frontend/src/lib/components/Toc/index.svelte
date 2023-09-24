<script lang="ts" context="module">
	export interface Title {
		key: string;
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
	export let nodes: LexicalNode[];

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
		console.log(minIndent);
		return titles.map((title) => ({
			indent: (title.tag === "h1" ? 0 : title.tag === "h2" ? 1 : 2) - minIndent,
			text: title?.children?.[0].text as string,
			key: title?.children?.[0].text as string,
			tag: title?.tag as "h1" | "h2" | "h3"
		}));
	}
	console.log(nodes);
	console.log(getTitles(nodes));
</script>

<div class={cn("flex", "flex-col", "gap-[10px]", "mt-3", "ml-3")}>
	<div class={cn("text-[14px]", "font-bold")}>Table Of Content</div>
	{#each getTitles(nodes) as title}
		<Node {title} />
	{/each}
</div>
