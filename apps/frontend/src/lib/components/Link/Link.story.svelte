<script lang="ts">
	import type { Hst } from "@histoire/plugin-svelte";
	import Link from "$lib/components/Link/index.svelte";
	import { cn } from "@/lib/cn";
	export let Hst: Hst;

	let content = "Link";
</script>

<Hst.Story title="Link">
	<svelte:fragment slot="controls">
		<Hst.Text bind:value={content} title="Content" />
	</svelte:fragment>
	<Link className={cn("m-4", "text-[32px]")} {content} href="https://swh00tw.me" />
</Hst.Story>
