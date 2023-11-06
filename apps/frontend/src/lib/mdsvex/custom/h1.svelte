<script lang="ts">
	import { cn } from "@/lib/cn";
	import { textVariant } from "@/lib/variants";
</script>

<h1
	class={cn(
		"font-bold",
		"text-white",
		"mb-4",
		"mt-12",
		"relative",
		"scroll-mt-[100px]",
		textVariant({
			size: "h1"
		})
	)}
>
	<slot />
</h1>
