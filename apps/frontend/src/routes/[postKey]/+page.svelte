<script lang="ts">
	import type { PageData } from "./$houdini";
	import { cn } from "$lib/cn";
	import Headerbar from "@/lib/components/Headerbar/index.svelte";
	import { textVariant } from "@/lib/variants";
	import { getDateString } from "@/lib/getDateString";

	export let data: PageData;
	$: ({ PagePost } = data);
	$: readingTime = Math.ceil(
		((($PagePost?.data?.Post?.content?.words ?? 0) as number) * 7.7) / 1000
	);
</script>

<div class={cn("relative")}>
	<img
		src={$PagePost?.data?.Post?.coverImage?.sizes?.background?.url}
		alt={`${$PagePost?.data?.Post?.title ?? "$title"}-coverImage`}
		class={cn("absolute", "top-[60px]", "md:top-0", "left-0", "w-full", "z-[-2]")}
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
			"w-[100vw]",
			"pt-[calc(100vw*0.22)]"
		)}
	>
		{#if $PagePost?.data?.Post}
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
							{getDateString($PagePost.data.Post.publishedDate)}
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
					<div
						class={cn("w-full", "lg:w-[72%]", "border-red-50", "border", "text-text", "h-[100vh]")}
					>
						123
					</div>
					<div class={cn("hidden", "lg:block", "lg:w-[26%]")}>toc</div>
				</div>
			</div>
			<div class={cn("my-12", "lg:my-24")}>Footer</div>
		{:else if $PagePost.fetching}
			<!-- TODO: add loading -->
			<div>loading...</div>
		{:else}
			<!-- TODO: add 404 -->
			<div>404</div>
		{/if}
	</div>
</div>
