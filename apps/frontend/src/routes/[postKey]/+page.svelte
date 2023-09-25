<script lang="ts">
	import type { PageData } from "./$houdini";
	import { cn } from "$lib/cn";
	import Headerbar from "@/lib/components/Headerbar/index.svelte";
	import { textVariant } from "@/lib/variants";
	import { getDateString } from "@/lib/getDateString";
	import AuthorCard from "@/lib/components/AuthorCard/index.svelte";
	import { encodePostKey } from "@/lib/encodePostKey";
	import { parseJson } from "$lib/serializer/parse";
	import type { JsonContent } from "$lib/serializer/types";
	import LexicalNodes from "@/lib/serializer/LexicalNodes.svelte";
	import { getImagePrefix } from "@/lib/getImagePrefix";
	import Toc from "@/lib/components/Toc/index.svelte";
	import { inview } from "svelte-inview";
	import { Stretch } from "svelte-loading-spinners";

	export let data: PageData;
	let json: JsonContent | null = null;
	let parseError = false;
	$: ({ PagePost } = data);
	$: readingTime = Math.ceil(
		((($PagePost?.data?.Post?.content?.words ?? 0) as number) * 7.7) / 1000
	);
	$: idx = ($PagePost?.data?.Posts?.docs ?? []).findIndex(
		(post) => post && post.id === $PagePost?.data?.Post?.id
	);
	$: prevUrl =
		idx > 0
			? encodePostKey($PagePost?.data?.Posts?.docs?.[idx - 1]?.title ?? "") ?? undefined
			: undefined;
	$: nextUrl =
		idx < ($PagePost?.data?.Posts?.docs?.length ?? 0) - 1
			? encodePostKey($PagePost?.data?.Posts?.docs?.[idx + 1]?.title ?? "") ?? undefined
			: undefined;
	$: {
		if ($PagePost?.data?.Post?.content) {
			const res = parseJson($PagePost?.data?.Post?.content?.jsonContent);
			if (res.success) {
				json = res.data;
			} else {
				parseError = true;
			}
		}
	}

	let isInView = true;
	$: coverImageUrl = `${getImagePrefix()}${
		$PagePost?.data?.Post?.coverImage?.sizes?.background?.url
	}`;
</script>

<svelte:head>
	<link rel="preload" as="image" href={coverImageUrl} />
</svelte:head>

<div class={cn("relative", "overflow-x-hidden")}>
	<img
		src={coverImageUrl}
		alt={`${$PagePost?.data?.Post?.title ?? "$title"}-coverImage`}
		class={cn("absolute", "top-[60px]", "md:top-0", "left-0", "w-full", "z-[-2]")}
		fetchpriority="high"
		loading="eager"
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
	<Headerbar />
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
		{#if $PagePost?.errors || parseError}
			<!-- TODO: add 404 -->
			<div class={cn("h-[80vh]")}>404</div>
		{:else if $PagePost?.data?.Post}
			<div class={cn("flex", "lg:w-[60%]", "w-full", "md:w-[80%]", "flex-col")}>
				<div class={cn("flex", "flex-col", "px-2", "md:px-0", "gap-y-5")}>
					<p
						class={textVariant({ size: "heading", class: cn("lg:text-[64px]", "md:text-[48px]") })}
					>
						{$PagePost.data.Post.title}
					</p>
					<p class={textVariant({ class: cn("md:text-[24px]", "text-[16px]", "text-text02") })}>
						{$PagePost.data.Post.description}
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
							{#if $PagePost.data.Post.publishedDate}
								{getDateString($PagePost.data.Post.publishedDate)}
							{/if}
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
					<div class={cn("w-full", "lg:w-[72%]", "text-content", "text-[16px]", "min-h-[43svh]")}>
						{#if json}
							<LexicalNodes nodes={json.root.children} pageId={$PagePost.variables?.id} />
						{/if}
					</div>
					<div class={cn("hidden", "lg:block", "lg:w-[22%]", "relative")}>
						<Toc
							isSticky={!isInView}
							nodes={json?.root?.children ?? []}
							pageId={$PagePost.variables?.id}
						/>
						<div
							class={cn("absolute", "h-[1px]", "w-full", "bg-transparent", "top-[-100px]")}
							use:inview={{}}
							on:inview_change={(event) => {
								isInView = event.detail.inView;
							}}
						/>
					</div>
				</div>
			</div>
		{:else if $PagePost.fetching}
			<div class={cn("h-[70vh]", "flex", "w-full", "justify-center", "items-center")}>
				<Stretch size="60" color="#3e3e3e" unit="px" duration="1s" />
			</div>
		{/if}
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
		<div class={cn("mb-12", "lg:mb-16")}>
			<AuthorCard {prevUrl} {nextUrl} />
		</div>
	</div>
</div>
