<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import Button from "$lib/components/Button/index.svelte";
	import { cn } from "$lib/cn";
	import { ChevronLeft } from "lucide-svelte";
	import { textVariant } from "@/lib/variants";
	import { clickToCopy } from "$lib/copyToClipboard";

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let content = "Share";
	let copied = false;
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
		"top-0"
	)}
>
	<div class={cn("flex", "justify-between", "lg:w-[60%]", "w-full", "md:w-[80%]")}>
		<Button variant="unstyled">
			<a href="/">
				<div class="flex flex-row">
					<ChevronLeft size="24" />
					<p class={textVariant()}>swh00tw.dev</p>
				</div>
			</a>
		</Button>
		<Button class={cn("text-[16px]")} variant={copied ? "accent" : "primary"}>
			<span
				use:clickToCopy={{
					url: window.location.href,
					callback: () => {
						copied = true;
						content = copied ? "Copied!" : "Share";
					}
				}}>{content}</span
			>
		</Button>
	</div>
</div>
