<script lang="ts">
	// ref: https://css-tricks.com/lazy-loading-images-in-svelte/
	import { cn } from "@/lib/cn";
	import { onMount } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	export let src: string;
	export let alt: string;

	interface $$Props extends HTMLAttributes<HTMLImageElement> {
		src: string;
		alt: string;
	}

	let loaded = false;
	let thisImage: HTMLImageElement;

	onMount(() => {
		thisImage.onload = () => {
			loaded = true;
		};
	});
</script>

<img {...$$restProps} {src} {alt} class:loaded bind:this={thisImage} loading="lazy" />

<style>
	img {
		opacity: 0;
		transition: opacity 1200ms ease-out;
	}
	img.loaded {
		opacity: 1;
	}
</style>
