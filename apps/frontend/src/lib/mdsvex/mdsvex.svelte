<script lang="ts" context="module">
	import h1 from "./custom/h1.svelte";
	import h2 from "./custom/h2.svelte";
	import h3 from "./custom/h3.svelte";
	import h4 from "./custom/h4.svelte";
	import h5 from "./custom/h5.svelte";
	import h6 from "./custom/h6.svelte";
	import p from "./custom/p.svelte";
	import a from "./custom/a.svelte";
	import ol from "./custom/ol.svelte";
	import li from "./custom/li.svelte";
	import ul from "./custom/ul.svelte";

	export { h1, h2, h3, h4, h5, h6, p, a, ol, li, ul };
</script>

<slot />
