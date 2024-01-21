<script lang="ts">
	import { cn } from "$lib/cn";
	import { textVariant } from "@/lib/variants";
	import { getDateString } from "@/lib/getDateString";
	import AuthorCard from "@/lib/components/AuthorCard/index.svelte";
	import ImageLoader from "$lib/components/ImageLoader/index.svelte";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { dev } from "$app/environment";
	export let data;

	$: rootUrl = $page.url.origin;

	$: prevUrl = data.prevSlug ? `${rootUrl}/${data.prevSlug}` : undefined;
	$: nextUrl = data.nextSlug ? `${rootUrl}/${data.nextSlug}` : undefined;
	$: coverImageUrl = data.meta.backgroundImgSrc ?? data.meta.coverImgSrc;

	// currently only hit the api to increment the view count
	// not using the returned value for display yet
	onMount(() => {
		if (dev) {
			fetch(`api/posts/${data.meta.slug}`)
				.then(async (res) => {
					// console.log(await res.json());
				})
				.catch((err) => {
					// console.log(err);
				});
		}
	});

	const coverImageStyle = "absolute top-[30px] sm:top-0 left-0 w-full z-[-2] h-[calc(100vw*9/16)]";
	const mobileCoverImageStyle = "w-full h-[calc(90vw*9/16)] rounded-lg mt-10";
</script>

<svelte:head>
	<title>{data.meta.title ?? "swh00tw.dev"}</title>
	<meta name="description" content={data.meta.description ?? "Personal blog by swh00tw"} />
	<link rel="preload" as="image" href={coverImageUrl} />
	<meta property="og:url" content="https://swh00tw-blog.vercel.app/" />
	<meta property="og:type" content="article" />
	<meta property="og:title" content="swh00tw.dev" />
	<meta property="og:description" content="Personal Blog by Frank Hsu" />
	<meta
		property="og:image"
		content={`${rootUrl}/og?${`title=${encodeURIComponent(
			data.meta.title
		)}`}${`&desc=${encodeURIComponent(data.meta.description)}`}${`&image=${encodeURIComponent(
			coverImageUrl
		)}`}`}
	/>
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="swh00tw.dev" />
	<meta property="twitter:url" content="https://swh00tw.dev" />
	<meta name="twitter:title" content="swh00tw.dev" />
	<meta name="twitter:description" content="Personal Blog by Frank Hsu" />
	<meta
		property="twitter:image"
		content={`${rootUrl}/og?${`title=${encodeURIComponent(
			data.meta.title
		)}`}${`&desc=${encodeURIComponent(data.meta.description)}`}${`&image=${encodeURIComponent(
			coverImageUrl
		)}`}`}
	/>
</svelte:head>

<div class={cn("relative", "overflow-x-hidden")}>
	<ImageLoader
		src={coverImageUrl}
		alt={`title-coverImage`}
		class={cn(coverImageStyle)}
		fetchpriority="high"
		wrapperClass={cn(coverImageStyle, "bg-background", "hidden", "sm:block")}
	/>
	<div
		class={cn(
			"bg-gradient-to-t",
			"from-background",
			"from-[15.97%]",
			"to-[#24242490]",
			"to-100%",
			"z-[-1]",
			"absolute",
			"inset-0",
			"top-[60px]",
			"sm:top-0",
			"h-[calc(100vw*9/16)]"
		)}
	/>
	<div
		class={cn(
			"px-6",
			"flex",
			"flex-col",
			"items-center",
			"justify-center",
			"w-[100svw]",
			"pt-[calc(100vw*0.22)]"
		)}
	>
		<div class={cn("flex", "lg:w-[60%]", "w-full", "md:w-[80%]", "flex-col")}>
			<div class={cn("flex", "flex-col", "px-2", "md:px-0", "gap-y-5")}>
				<p class={textVariant({ size: "heading", class: cn("lg:text-[64px]", "md:text-[48px]") })}>
					{`${data.meta.title}`}
				</p>
				<p class={textVariant({ class: cn("md:text-[24px]", "text-[16px]", "text-text02") })}>
					{`${data.meta.description}`}
				</p>
				<div
					class={cn(
						"flex",
						"flex-row",
						"items-center",
						"gap-x-4",
						"text-text02",
						textVariant({ class: cn("text-[14px]", "md:text-[16px]") })
					)}
				>
					<p>
						{getDateString(data.meta.publishedAt)}
					</p>
					<!-- <div class={cn("h-[21px]", "w-[1px]", "bg-text02")} />
					<p>
						{`${viewers} views`}
					</p> -->
				</div>
			</div>
			<ImageLoader
				src={coverImageUrl}
				alt={`title-coverImage`}
				class={cn(mobileCoverImageStyle)}
				fetchpriority="high"
				wrapperClass={cn(mobileCoverImageStyle, "bg-background", "sm:hidden", "block")}
			/>
			<div
				class={cn(
					"flex",
					"flex-row",
					"justify-between",
					"w-full",
					"mt-0",
					"sm:mt-[calc(100vw*0.15)]"
				)}
			>
				<div class={cn("w-full", "text-content", "text-[18px]", "leading-loose", "min-h-[43svh]")}>
					<svelte:component this={data.content} />
				</div>
			</div>
		</div>
	</div>
	<div
		class={cn(
			"bg-gradient-radial",
			"from-border",
			"to-transparent",
			"to-80%",
			"w-[100vw]",
			"h-[3px]",
			"mt-12",
			"lg:mt-24",
			"mb-4"
		)}
	/>
</div>
<div class={cn("mb-12", "lg:mb-16")}>
	<AuthorCard {prevUrl} {nextUrl} />
</div>
