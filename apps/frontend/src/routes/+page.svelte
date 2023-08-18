<script lang="ts">
	import Tag from "@/lib/components/Tag/index.svelte";
	import IntroCard from "@/lib/components/IntroCard/index.svelte";
	import type { PageData } from "./$houdini";
	import { cn } from "@/lib/cn";
	import Footer from "@/lib/components/Footer/index.svelte";
	import PostCard from "@/lib/components/PostCard/index.svelte";
	import { faker } from "@faker-js/faker";
	export let data: PageData;

	$: ({ AllPosts } = data);
	$: console.log(AllPosts);
	const fakePostProps = Array.from({ length: 6 }, (_) => {
		const coverImgSrc = faker.image.url({
			height: 450,
			width: 800
		});
		const publishedAt = faker.date.past().toISOString();
		const title = faker.lorem.sentence({ min: 4, max: 8 });
		const tags = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, (_) =>
			faker.lorem.word({ length: { min: 3, max: 6 } })
		);
		const description = faker.lorem.paragraph({ min: 3, max: 10 });
		const readingTime = faker.number.int({ min: 1, max: 30 });
		return {
			coverImgSrc,
			publishedAt,
			title,
			tags,
			description,
			readingTime
		};
	});
	console.log(fakePostProps);
</script>

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
			{#each fakePostProps.filter((_, i) => i % 3 == 0) as postProps}
				<PostCard {...postProps} />
			{/each}
		</div>
		<div class={cn("flex-col", "hidden", "lg:flex", "w-fit", "gap-y-4")}>
			{#each fakePostProps.filter((_, i) => i % 3 == 1) as postProps}
				<PostCard {...postProps} />
			{/each}
		</div>
		<div class={cn("flex-col", "hidden", "lg:flex", "w-fit", "gap-y-4")}>
			{#each fakePostProps.filter((_, i) => i % 3 == 2) as postProps}
				<PostCard {...postProps} />
			{/each}
		</div>
		<!-- For md screen size -->
		<div class={cn("flex-col", "hidden", "md:flex", "lg:hidden", "w-fit", "gap-y-4")}>
			{#each fakePostProps.filter((_, i) => i % 2 == 0) as postProps}
				<PostCard {...postProps} />
			{/each}
		</div>
		<div class={cn("flex-col", "hidden", "md:flex", "lg:hidden", "w-fit", "gap-y-4")}>
			{#each fakePostProps.filter((_, i) => i % 2 == 1) as postProps}
				<PostCard {...postProps} />
			{/each}
		</div>
		<!-- For sm screen size -->
		<div class={cn("flex-col", "flex", "md:hidden", "w-fit", "gap-y-4")}>
			{#each fakePostProps as postProps}
				<PostCard {...postProps} />
			{/each}
		</div>
	</div>
</div>
<Footer />
