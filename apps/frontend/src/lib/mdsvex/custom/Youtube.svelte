<script>
	export let title = "";
	export let id = "";
</script>

<iframe
	src="https://www.youtube.com/embed/{id}?autoplay=0&rel=0"
	{title}
	frameborder="0"
	allow="picture-in-picture; clipboard-write"
	allowfullscreen
/>

<style>
	iframe {
		height: auto;
		aspect-ratio: 16/9;
		width: 100%;
		margin-top: 1rem;
		margin-bottom: 0.5rem;
	}
</style>
