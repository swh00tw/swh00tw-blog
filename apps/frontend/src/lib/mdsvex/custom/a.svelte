<script lang="ts">
	import Link from "@/lib/components/Link/index.svelte";

	export let href: string;
</script>

<Link {href} content="">
	<slot />
</Link>
