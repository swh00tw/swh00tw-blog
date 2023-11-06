<script lang="ts">
	import { cn } from "@/lib/cn";
</script>

<ol
	class={cn(
		"list-decimal",
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
</ol>
