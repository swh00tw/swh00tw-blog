<script lang="ts">
	import { cn } from "@/lib/cn";

	export let type = "Info";
	const icon: Record<string, string> = {
		Info: "💡",
		Deprecated: "🚨"
	};
</script>

<div
	class={cn(
		"bg-primary",
		"bg-opacity-50",
		"rounded-md",
		"border-accent",
		"border-[1px]",
		"flex",
		"flex-col",
		"px-4",
		"py-2"
	)}
>
	<div class={cn("flex", "flex-row", "gap-x-2", "text-[16px]", "mb-1")}>
		<div>{icon?.[type] ?? "📝"}</div>
		<div class={cn("font-bold")}>{type}</div>
	</div>
	<div class="text-[14px]"><slot /></div>
</div>
