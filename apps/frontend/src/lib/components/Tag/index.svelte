<script lang="ts">
	import { cn } from "$lib/cn";
	import { Hash } from "lucide-svelte";

	export let content: string;
	export let active = false;
	export let className: string | null = "";
</script>

<div
	class={cn(
		"px-[10px]",
		"py-1",
		"rounded-full",
		"bg-[#303030]",
		"border-[1px]",
		"border-[#4d4d4d]",
		"w-fit",
		"text-[14px]",
		"text-text",
		"flex",
		"items-center",
		"gap-x-1",
		"transition-all",
		{
			"border-accent": active,
			"bg-primary": active
		},
		className
	)}
>
	<Hash class={cn("w-[14px]", "h-[14px]")} />
	{content}
</div>
