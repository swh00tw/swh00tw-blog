<script lang="ts">
	import { cn } from "$lib/cn";
	import ImageLoader from "$lib/components/ImageLoader/index.svelte";
	import Button from "../Button/index.svelte";
</script>

<div
	class={cn(
		"bg-background",
		"border-border",
		"border-[1px]",
		"bg-opacity-90",
		"rounded-2xl",
		"p-8",
		"md:p-20",
		"lg:w-[calc(100vw*0.5)]",
		"md:w-[calc(100vw*0.7)]",
		"w-[calc(100vw*0.8)]",
		"fixed",
		"top-[50%]",
		"left-[50%]",
		"translate-x-[-50%]",
		"translate-y-[-50%]",
		"flex",
		"flex-col",
		"items-center",
		"justify-center"
	)}
>
	<ImageLoader
		src={"https://http.cat/500"}
		alt="something went wrong"
		class="rounded-xl w-full md:w-[80%] scale-120 md:scale-100"
		wrapperClass="rounded-xl bg-transparent flex justify-center w-full"
	/>
	<p class={cn("mt-10", "text-center", "font-bold", "text-[20px]")}>Oops! Something went wrong😿</p>
	<div class={cn("flex", "flex-row", "gap-x-4", "items-center", "mt-10")}>
		<a href="mailto:a614000@gmail.com"> <Button>Report this</Button></a>
		<div>or</div>
		<a href="/" data-sveltekit-preload-data> <Button variant="accent">Go back</Button></a>
	</div>
</div>
