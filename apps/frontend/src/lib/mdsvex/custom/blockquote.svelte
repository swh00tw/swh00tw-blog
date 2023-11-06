<script lang="ts">
	import { cn } from "@/lib/cn";
</script>

<div class={cn("relative")}>
	<blockquote
		class={cn(
			"before:content-['']",
			"before:absolute",
			"before:w-[2px]",
			"before:h-full",
			"before:bg-accent",
			"before:left-0",
			"pl-4",
			"text-text02"
		)}
	>
		<slot />
	</blockquote>
</div>
