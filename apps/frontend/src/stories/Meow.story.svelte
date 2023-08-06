<script lang="ts">
	// for testing
	import type { Hst } from "@histoire/plugin-svelte";
	export let Hst: Hst;

	let disabled = false;
	let content = "Meow";
</script>

<Hst.Story title="🐱 Meow">
	<Hst.Variant title="test"
		>🐱
		<svelte:fragment slot="controls">
			<Hst.Text bind:value={content} title="Content" />
			<Hst.Checkbox bind:value={disabled} title="Disabled" />
		</svelte:fragment></Hst.Variant
	>
</Hst.Story>
