<script lang="ts">
	import { cn } from "$lib/cn";
	import type { Title } from "./index.svelte";
	import { scrollTo } from "svelte-scrolling";

	export let title: Title;
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
		"duration-300"
	)}
	use:scrollTo={{
		ref: title.text,
		duration: 300,
		offset: -100
	}}
>
	{title.text}
</div>
