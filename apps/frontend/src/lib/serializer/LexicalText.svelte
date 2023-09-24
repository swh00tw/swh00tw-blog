<script lang="ts">
	import {
		IS_BOLD,
		IS_ITALIC,
		IS_STRIKETHROUGH,
		IS_UNDERLINE,
		IS_CODE,
		IS_SUBSCRIPT,
		IS_SUPERSCRIPT
	} from "$lib/serializer/richTextNodeFormat";

	import type { LexicalNode } from "./types";

	interface $$Prop {
		node: LexicalNode;
	}
	export let node: LexicalNode;
	const textDecorations = [
		IS_BOLD,
		IS_ITALIC,
		IS_STRIKETHROUGH,
		IS_UNDERLINE,
		IS_CODE,
		IS_SUBSCRIPT,
		IS_SUPERSCRIPT
	];
	const renderText = (nodeText: string) =>
		textDecorations.reduce((text, decoration) => {
			if (typeof node.format === "number" && node.format & decoration) {
				switch (decoration) {
					case IS_BOLD: {
						return `<strong>${text}</strong>`;
					}
					case IS_ITALIC: {
						return `<em>${text}</em>`;
					}
					case IS_STRIKETHROUGH: {
						return `<span class="line-through">${text}</span>`;
					}
					case IS_UNDERLINE: {
						return `<span class="underline">${text}</span>`;
					}
					case IS_CODE: {
						return `<code class="text-[#8F34C9] bg-[#00000030] px-[6px] py-[2px] rounded-[4px]">${text}</code>`;
					}
					case IS_SUBSCRIPT: {
						return `<sub>${text}</sub>`;
					}
					case IS_SUPERSCRIPT: {
						return `<sup>${text}</sup>`;
					}
					default: {
						return text;
					}
				}
			}
			return text;
		}, `<span class="hyphens-auto">${nodeText}</span>`);
</script>

{#if node.text}
	{@html renderText(node.text)}
{:else}
	<div />
{/if}
