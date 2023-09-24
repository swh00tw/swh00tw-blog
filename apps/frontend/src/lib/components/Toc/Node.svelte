<script lang="ts">
	import { cn } from "$lib/cn";
	import type { Title } from "./index.svelte";
	import { currSection } from "$lib/components/Toc/currSection";

	export let title: Title;
	export let pageId: string | undefined = undefined;
</script>

<div
	class={cn(
		{
			"ml-3": title.indent === 1,
			"ml-6": title.indent === 2
		},
		"text-text02",
		"text-[12px]",
		"font-medium",
		"cursor-pointer",
		"hover:text-text",
		"transition-all",
		"ease-in-out",
		"duration-300",
		{
			"text-text": $currSection?.[pageId ?? ""]?.curr === title.text
		}
	)}
>
	<a href={`#${title.text}`}> {title.text}</a>
</div>
