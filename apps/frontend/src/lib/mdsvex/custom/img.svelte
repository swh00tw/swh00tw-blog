<script lang="ts">
	import ImageLoader from "@/lib/components/ImageLoader/index.svelte";
	import { cn } from "@/lib/cn";

	export let src: string;
	export let alt: string;
</script>

<div class={cn("my-12", "flex", "flex-col", "items-center", "w-full", "mx-auto")}>
	<ImageLoader
		{src}
		{alt}
		class={cn(
			"rounded-lg",
			"border-2",
			"border-border",
			"lg:h-[calc(100vw*0.6*9/16)] md:h-[calc(100vw*0.8*9/16)]  h-[calc((100vw-24px)*9/16)]"
		)}
		wrapperClass="rounded-lg lg:h-[calc(100vw*0.6*9/16)] md:h-[calc(100vw*0.8*9/16)]  h-[calc((100vw-24px)*9/16)] bg-background flex justify-center items-center"
	/>
	<p class={cn("text-[#808080]", "text-[12px]")}>
		{alt ?? ""}
	</p>
</div>
