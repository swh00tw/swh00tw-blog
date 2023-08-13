<script lang="ts">
	import type { Hst } from "@histoire/plugin-svelte";
	import Button from "$lib/components/Button/index.svelte";
	import { cn } from "@/lib/cn";
	export let Hst: Hst;

	let content = "Share";
	let copied = false;
</script>

<Hst.Story title="Button">
	<svelte:fragment slot="controls">
		<Hst.Text bind:value={content} title="Content" />
	</svelte:fragment>
	<Hst.Variant title="primary">
		<Button class={cn("m-4", "text-[16px]")}>{content}</Button>
	</Hst.Variant>
	<Hst.Variant title="accent">
		<Button class={cn("m-4", "text-[16px]")} variant="accent">{content}</Button>
	</Hst.Variant>
	<Hst.Variant title="copy/paste">
		<Button
			class={cn("m-4", "text-[16px]")}
			variant={copied ? "accent" : "primary"}
			on:click={() => {
				copied = !copied;
				content = copied ? "Copied!" : "Share";
			}}>{content}</Button
		>
	</Hst.Variant>
</Hst.Story>
