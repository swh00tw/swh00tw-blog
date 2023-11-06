<script lang="ts">
	import { cn } from "@/lib/cn";
	import { textVariant } from "@/lib/variants";
</script>

<h3
	class={cn(
		"font-bold",
		"text-white",
		"mb-4",
		"relative",
		"scroll-mt-[100px]",
		textVariant({
			size: "h3"
		})
	)}
>
	<slot />
</h3>
