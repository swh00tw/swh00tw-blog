<script lang="ts">
	import { cn } from "@/lib/cn";
	import type { HTMLButtonAttributes } from "svelte/elements";

	interface $$Props extends HTMLButtonAttributes {
		variant?: "unstyled" | "primary" | "accent";
	}

	export let variant: "unstyled" | "primary" | "accent" = "primary";

	const primaryStyle = cn("bg-secondary");
	const accentStyle = cn("bg-gradient-to-r", "from-primary", "to-accent");
	$: additionalStyle =
		variant === "primary" ? primaryStyle : variant === "accent" ? accentStyle : "";
</script>

<button
	{...$$restProps}
	class={cn(
		"text-text02",
		"hover:text-text",
		"transition-all",
		"duration-500",
		"px-3",
		"py-2",
		"flex",
		"justify-center",
		"items-center",
		"rounded-[8px]",
		additionalStyle,
		$$props.class
	)}
	on:click
>
	<slot />
</button>
