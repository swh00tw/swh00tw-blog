<script lang="ts">
	import type { PageData } from "./$houdini";
	export let data: PageData;
	$: ({ PagePost } = data);
	$: console.log("pagepost: ", $PagePost);
</script>

<h1>I am new page</h1>
