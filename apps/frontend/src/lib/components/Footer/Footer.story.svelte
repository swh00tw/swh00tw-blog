<script lang="ts">
	import type { Hst } from "@histoire/plugin-svelte";
	import Footer from "$lib/components/Footer/index.svelte";
	export let Hst: Hst;
</script>

<Hst.Story title="Footer">
	<Footer />
</Hst.Story>
