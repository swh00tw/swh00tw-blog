<script lang="ts">
	import type { Hst } from "@histoire/plugin-svelte";
	import Headerbar from "$lib/components/Headerbar/index.svelte";
	export let Hst: Hst;
</script>

<Hst.Story title="Headerbar">
	<Headerbar />
</Hst.Story>
