<script lang="ts">
	import { cn } from "@/lib/cn";
	import { textVariant } from "@/lib/variants";
	import SvelteIcon from "@/lib/components/Footer/SvelteIcon.svelte";
	import VercelIcon from "./VercelIcon.svelte";
</script>

<div class={cn("h-[3px]", "bg-gradient-radial", "from-border", "to-transparent", "to-80%")} />
<div
	class={cn(
		"w-full",
		"flex",
		"flex-col",
		"items-center",
		"justify-center",
		"gap-y-[10px]",
		"py-[20px]",
		"h-fit",
		"text-text02"
	)}
>
	<div class={textVariant({ size: "h4" })}>
		<div class={cn("flex", "flex-row", "gap-x-4")}>
			<div class="flex flex-row items-center gap-x-2">
				<p>Built by</p>
				<SvelteIcon />
			</div>
			<div class={cn("w-[1px]", "h-[26px]", "bg-text02")} />
			<div class="flex flex-row items-center gap-x-2">
				<p>Deploy via</p>
				<VercelIcon />
			</div>
		</div>
	</div>
	<div class={textVariant({ size: "h6" })}>© 2023 Shu-Wei Hsu. All rights reserved.</div>
</div>
