<script>
	import "../app.css";
	// add custom fonts
	import "@fontsource/dm-sans/400.css";
	import "@fontsource/dm-sans/500.css";
	import "@fontsource/dm-sans/700.css";
	import "@fontsource/dm-sans/400-italic.css";
	import "@fontsource/dm-sans/500-italic.css";
	import "@fontsource/dm-sans/700-italic.css";
	import "@fontsource-variable/work-sans";
	import "@fontsource-variable/work-sans/wght-italic.css";
	import "@fontsource/jetbrains-mono";

	import PageTransition from "$lib/components/Transition/index.svelte";
	export let data;
</script>

<PageTransition url={data.url}>
	<slot />
</PageTransition>
