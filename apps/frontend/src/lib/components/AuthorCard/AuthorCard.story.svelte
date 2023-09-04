<script lang="ts">
	import type { Hst } from "@histoire/plugin-svelte";
	import AuthorCard from "$lib/components/AuthorCard/index.svelte";
	export let Hst: Hst;
</script>

<Hst.Story title="AuthorCard">
	<AuthorCard prevUrl={"fake1"} nextUrl={"fake2"} />
</Hst.Story>
