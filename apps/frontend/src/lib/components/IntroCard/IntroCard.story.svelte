<script lang="ts">
	import type { Hst } from "@histoire/plugin-svelte";
	import IntroCard from "$lib/components/IntroCard/index.svelte";
	import { cn } from "@/lib/cn";
	export let Hst: Hst;
</script>

<Hst.Story title="IntroCard">
	<div class={cn("m-4", "flex", "justify-center")}>
		<IntroCard />
	</div>
</Hst.Story>
