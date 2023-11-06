<script lang="ts">
	import { cn } from "@/lib/cn";
	import { textVariant } from "@/lib/variants";
</script>

<h5
	class={cn(
		"font-bold",
		"mb-4",
		"mt-12",
		"relative",
		"scroll-mt-[100px]",
		textVariant({
			size: "h5"
		})
	)}
>
	<slot />
</h5>
