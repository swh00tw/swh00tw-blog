<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import Button from "$lib/components/Button/index.svelte";
	import ShareButton from "$lib/components/ShareBtn/index.svelte";
	import { cn } from "$lib/cn";
	import { ChevronLeft } from "lucide-svelte";
	import { textVariant } from "@/lib/variants";
	import { onMount } from "svelte";

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let sharedUrl = "";
	onMount(() => {
		sharedUrl = window.location.href;
	});
</script>

<div
	class={cn(
		"w-full",
		"border-b",
		"border-border",
		"bg-background",
		"bg-opacity-[70%]",
		"px-6",
		"py-[10px]",
		"backdrop-blur-[15px]",
		"flex",
		"justify-center",
		"fixed",
		"top-0",
		"z-50"
	)}
>
	<div class={cn("flex", "justify-between", "lg:w-[60%]", "w-full", "md:w-[80%]")}>
		<Button variant="unstyled">
			<a href="/" data-sveltekit-preload-data>
				<div class="flex flex-row">
					<ChevronLeft size="24" />
					<p class={textVariant()}>swh00tw.dev</p>
				</div>
			</a>
		</Button>
		{#key sharedUrl}
			<ShareButton url={sharedUrl} />
		{/key}
	</div>
</div>
