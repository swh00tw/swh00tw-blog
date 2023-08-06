<script lang="ts">
	import type { Hst } from "@histoire/plugin-svelte";
	import Tag from "$lib/components/Tag/index.svelte";
	export let Hst: Hst;

	let content = "React";
	let active = false;
</script>

<Hst.Story title="Tags">
	<svelte:fragment slot="controls">
		<Hst.Text bind:value={content} title="Content" />
		<Hst.Checkbox bind:value={active} title="Active" />
	</svelte:fragment>
	<Tag content="Foo" {active} />
</Hst.Story>
