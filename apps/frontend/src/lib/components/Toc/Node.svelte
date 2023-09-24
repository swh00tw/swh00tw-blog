<script lang="ts">
	import { cn } from "$lib/cn";
	import type { Title } from "./index.svelte";

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
		"font-medium"
	)}
>
	{title.text}
</div>
