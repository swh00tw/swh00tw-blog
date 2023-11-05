<script lang="ts">
	import { cn } from "$lib/cn";
	import { textVariant } from "@/lib/variants";
	import { getDateString } from "@/lib/getDateString";
	import AuthorCard from "@/lib/components/AuthorCard/index.svelte";
	import ImageLoader from "$lib/components/ImageLoader/index.svelte";
	import { rootUrl } from "@/lib/config.js";

	export let data;

	$: prevUrl = data.prevSlug ? `${rootUrl}/${data.prevSlug}` : undefined;
	$: nextUrl = data.nextSlug ? `${rootUrl}/${data.nextSlug}` : undefined;
	$: readingTime = 0;

	$: coverImageUrl = data.meta.backgroundImgSrc ?? data.meta.coverImgSrc;
	const coverImageStyle = "absolute top-[30px] md:top-0 left-0 w-full z-[-2]";
</script>

<svelte:head>
	<title>{data.meta.title ?? "swh00tw.dev"}</title>
	<meta name="description" content={data.meta.description ?? "Personal blog by swh00tw"} />
	<link rel="preload" as="image" href={coverImageUrl} />
	<meta property="og:url" content="https://swh00tw-blog.vercel.app/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="swh00tw.dev" />
	<meta property="og:description" content="Personal Blog by Frank Hsu" />
	<meta
		property="og:image"
		content={`https://swh00tw-blog.vercel.app/og?${`title=${encodeURIComponent(
			data.meta.title
		)}`}${`&desc=${encodeURIComponent(data.meta.description)}`}`}
	/>
</svelte:head>

<div class={cn("relative", "overflow-x-hidden")}>
	<ImageLoader
		src={coverImageUrl}
		alt={`title-coverImage`}
		class={cn(coverImageStyle)}
		fetchpriority="high"
		wrapperClass={cn(coverImageStyle, "bg-background")}
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
			"md:top-0",
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
					<div class={cn("h-[21px]", "w-[1px]", "bg-text02")} />
					<p>
						{`${Array.from({ length: Math.ceil(readingTime / 10) }, (_) => "⌛").join(
							""
						)} ${readingTime} min read`}
					</p>
				</div>
			</div>
			<div class={cn("flex", "flex-row", "justify-between", "w-full", "mt-[calc(100vw*0.15)]")}>
				<div class={cn("w-full", "text-content", "text-[16px]", "min-h-[43svh]")}>
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