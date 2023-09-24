<script lang="ts">
	import type { LexicalNode } from "./types";
	import LexicalText from "./LexicalText.svelte";
	import { cn } from "$lib/cn";
	import Link from "../components/Link/index.svelte";
	import { textVariant } from "../variants";
	import { inview } from "svelte-inview";
	import { addSection, removeSection } from "$lib/components/Toc/currSection";

	export let pageId: string | undefined = undefined;
	export let nodes: LexicalNode[];

	function prepareSerializedChildren(node: LexicalNode): LexicalNode[] | null {
		if (node.type === "text") {
			return null;
		}
		if (!node.children || node?.children?.length === 0) {
			return null;
		}
		if (node.type === "list" && node?.listType === "checked") {
			for (const item of node.children) {
				if (!item?.checked) {
					item.checked = false;
				}
			}
		}
		return node.children;
	}
	function castTextVariant(tag: string) {
		return textVariant({
			size: tag as "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
			class: "text-text"
		});
	}
</script>

{#each nodes as node (node)}
	{#if node.type === "text"}
		<LexicalText {node} />
	{:else if prepareSerializedChildren(node) !== null}
		{@const childrenNodes = prepareSerializedChildren(node)}
		{#if node.type === "linebreak"}
			<br />
		{:else if node.type === "paragraph"}
			<p class="my-3"><svelte:self nodes={childrenNodes} /></p>
		{:else if node.type === "heading"}
			{@const tag = node?.tag ?? "h4"}
			{@const text = node?.children?.[0]?.text ?? ""}
			<svelte:element
				this={tag}
				class={cn(castTextVariant(tag), "my-3", "relative", "scroll-mt-[100px]")}
				id={text}
			>
				<svelte:self nodes={childrenNodes} />
				<div
					class={cn("absolute", "top-[250px]", "w-full", "h-[1px]", "bg-red-100")}
					use:inview={{}}
					on:inview_enter={() => {
						if (pageId === undefined) {
							return;
						}
						addSection(pageId, text);
					}}
					on:inview_leave={() => {
						if (pageId === undefined) {
							return;
						}
						removeSection(pageId, text);
					}}
				/>
			</svelte:element>
		{:else if node.type === "list"}
			{@const tag = node?.tag ?? "ul"}
			<svelte:element
				this={tag}
				class={cn("list-inside", "marker:text-content", "my-3", {
					"list-decimal": node?.tag === "ol",
					"list-disc": node?.tag === "ul"
				})}
			>
				<svelte:self nodes={childrenNodes} />
			</svelte:element>
		{:else if node.type === "listitem"}
			<!-- TODO: check checked is null or not -->
			<li>
				<svelte:self nodes={childrenNodes} />
			</li>
		{:else if node.type === "quote"}
			<div class="flex flex-row relative">
				<blockquote
					class={cn(
						"before:content-['']",
						"before:absolute",
						"before:w-[2px]",
						"before:h-full",
						"before:bg-accent",
						"before:left-0",
						"pl-4",
						"text-text02"
					)}
				>
					<svelte:self nodes={childrenNodes} />
				</blockquote>
			</div>
		{:else if node.type === "link"}
			{#if node.attributes?.url}
				<Link href={node.attributes.url} content={""}>
					<svelte:self nodes={childrenNodes} />
				</Link>
			{/if}
		{:else if node.type === "inline-image"}
			<!-- TODO: add image -->
			<div />
		{/if}
	{/if}
{/each}
