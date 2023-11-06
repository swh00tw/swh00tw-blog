<script lang="ts">
	import { cn } from "$lib/cn";
	import type { HTMLAttributes } from "svelte/elements";

	interface $$Props extends HTMLAttributes<HTMLDivElement> {
		content: string;
		href: string;
		external?: boolean;
	}

	export let content: string;
	export let href: string;
	export let external = false;
</script>

<div
	class={cn(
		"text-text02",
		"relative",
		"inline-block",
		"w-fit",
		"hover:text-text",
		"transition-all",
		"duration-500",
		"after:bg-gradient-to-r",
		"after:from-primary",
		"after:to-accent",
		"after:absolute",
		"after:bottom-0",
		"after:left-0",
		"after:right-0",
		"after:h-[2px]",
		"after:origin-left",
		"after:ease-[ubic-bezier(0.77, 0, 0.175, 1)]",
		"after:transition-transform",
		"after:duration-500",
		"after:hover:origin-right",
		"after:hover:translate-z-0",
		"after:hover:scale-x-0",
		"after:hover:ease-[cubic-bezier(0.165, 0.84, 0.44, 1)]",
		"before:bg-gradient-to-r",
		"before:from-primary",
		"before:to-accent",
		"before:absolute",
		"before:bottom-0",
		"before:left-0",
		"before:right-0",
		"before:h-[2px]",
		"before:origin-left",
		"before:ease-[ubic-bezier(0.77, 0, 0.175, 1)]",
		"before:transition-transform",
		"before:duration-500",
		"before:opacity-50",
		"before:translate-z-0",
		"before:scale-x-0",
		"before:hover:origin-right",
		"before:ease-[cubic-bezier(0.455, 0.03, 0.515, 0.955)]",
		"before:transition-all",
		"before:duration-400",
		$$props.class
	)}
>
	<a {href} target={external ? "_blank" : "_self"}>
		{content}
		<slot />
	</a>
</div>
