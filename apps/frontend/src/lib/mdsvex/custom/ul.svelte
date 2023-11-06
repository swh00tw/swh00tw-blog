<script lang="ts">
	import { cn } from "@/lib/cn";
</script>

<ul
	class={cn(
		"list-disc",
		"list-outside",
		"marker:text-content",
		"my-4",
		"flex-col",
		"gap-y-4",
		"flex",
		"ml-6"
	)}
>
	<slot />
</ul>
