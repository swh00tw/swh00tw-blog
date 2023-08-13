<script lang="ts">
	import { cn } from "@/lib/cn";
	import { textVariant } from "@/lib/variants";
	import Link from "$lib/components/Link/index.svelte";
</script>

<div
	class={cn(
		"flex",
		"flex-col-reverse",
		"md:flex-row",
		"justify-center",
		"items-center",
		"gap-y-[20px]",
		"w-full",
		"md:w-fit",
		"md:gap-x-[100px]",
		"lg:gap-x-[160px]"
	)}
>
	<div class={cn("flex-col", "gap-y-2", "w-full")}>
		<div class={textVariant({ size: "heading" })}>swh00tw.dev</div>
		<div class={textVariant({ size: "subheading", class: cn("text-text02") })}>
			Personal blog by <Link content="Frank Hsu" href="https://swh00tw.me" />
		</div>
		<div class={textVariant({ class: cn("text-text02") })}>
			I write code and share random good shit.
		</div>
	</div>
	<img
		src="../static/avatar.png"
		alt="avatar"
		class={cn("w-[160px]", "h-[160px]", "rounded-full", "object-cover")}
	/>
</div>
