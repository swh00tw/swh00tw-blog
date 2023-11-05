<script lang="ts">
	import IntroCard from "@/lib/components/IntroCard/index.svelte";
	import { cn } from "@/lib/cn";
	import Footer from "@/lib/components/Footer/index.svelte";
	import PostCard from "@/lib/components/PostCard/index.svelte";
	export let data;

	$: posts = data.posts.map((post) => ({
		coverImgSrc: post.coverImgSrc,
		publishedAt: post.publishedAt,
		title: post.title,
		description: post.description,
		tags: post.tags,
		readingTime: 0
	}));
</script>

<svelte:head>
	<title>swh00tw.dev</title>
	<meta name="description" content="Personal Blog by swh00tw" />
	<!-- Open Graph / Facebook -->
	<meta property="og:url" content="https://swh00tw-blog.vercel.app/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="swh00tw.dev" />
	<meta property="og:description" content="Personal Blog by Frank Hsu" />
	<meta property="og:image" content="https://swh00tw-blog.vercel.app/og" />
</svelte:head>

<div class={cn("w-full", "min-h-[calc(100svh-100px)]", "flex", "flex-col", "items-center")}>
	<div class={cn("py-[86px]")}>
		<IntroCard />
	</div>
	<div
		class={cn("h-[3px]", "bg-gradient-radial", "from-border", "to-transparent", "to-80%", "w-full")}
	/>
	<div class={cn("flex", "w-full", "flex-row", "justify-center", "gap-x-4", "my-[18px]")}>
		<!-- For lg screen size -->
		<div class={cn("flex-col", "hidden", "lg:flex", "w-fit", "gap-y-4")}>
			{#each posts.filter((_, i) => i % 3 == 0) as postProps}
				<PostCard {...postProps} />
			{/each}
		</div>
		<div class={cn("flex-col", "hidden", "lg:flex", "w-fit", "gap-y-4")}>
			{#each posts.filter((_, i) => i % 3 == 1) as postProps}
				<PostCard {...postProps} />
			{/each}
		</div>
		<div class={cn("flex-col", "hidden", "lg:flex", "w-fit", "gap-y-4")}>
			{#each posts.filter((_, i) => i % 3 == 2) as postProps}
				<PostCard {...postProps} />
			{/each}
		</div>
		<!-- For md screen size -->
		<div class={cn("flex-col", "hidden", "md:flex", "lg:hidden", "w-fit", "gap-y-4")}>
			{#each posts.filter((_, i) => i % 2 == 0) as postProps}
				<PostCard {...postProps} />
			{/each}
		</div>
		<div class={cn("flex-col", "hidden", "md:flex", "lg:hidden", "w-fit", "gap-y-4")}>
			{#each posts.filter((_, i) => i % 2 == 1) as postProps}
				<PostCard {...postProps} />
			{/each}
		</div>
		<!-- For sm screen size -->
		<div class={cn("flex-col", "flex", "md:hidden", "w-fit", "gap-y-4")}>
			{#each posts as postProps}
				<PostCard {...postProps} />
			{/each}
		</div>
	</div>
</div>
<Footer />
