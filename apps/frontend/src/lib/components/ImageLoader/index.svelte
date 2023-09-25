<script lang="ts">
	// ref: https://css-tricks.com/lazy-loading-images-in-svelte/
	import { onMount } from "svelte";
	import IntersectionObserver from "./IntersectionObserver.svelte";
	import Image from "./Image.svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "@/lib/cn";
	export let src: string;
	export let alt: string;
	export let wrapperClass: string | undefined;

	interface $$Props extends HTMLAttributes<HTMLImageElement> {
		src: string;
		alt: string;
		wrapperClass: string | undefined;
	}

	let nativeLoading = false;
	// Determine whether to bypass our intersecting check
	onMount(() => {
		if ("loading" in HTMLImageElement.prototype) {
			nativeLoading = true;
		}
	});
</script>

<IntersectionObserver once={true} let:intersecting>
	<div class={cn("bg-border", wrapperClass)}>
		{#if intersecting || nativeLoading}
			<Image {...$$restProps} {alt} {src} />
		{/if}
	</div>
</IntersectionObserver>
