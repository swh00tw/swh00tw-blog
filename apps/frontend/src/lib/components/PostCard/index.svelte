<script lang="ts">
	import { cn } from "@/lib/cn";
	import { textVariant } from "@/lib/variants";
	import type { HTMLAttributes, MouseEventHandler } from "svelte/elements";
	import Tag from "$lib/components/Tag/index.svelte";
	import { ChevronRight } from "lucide-svelte";
	import { getDateString } from "$lib/getDateString";
	import ImageLoader from "$lib/components/ImageLoader/index.svelte";

	interface $$Props extends HTMLAttributes<HTMLDivElement> {
		coverImgSrc: string;
		publishedAt: string;
		title: string;
		tags: string[];
		description: string;
		readingTime: number;
		slug: string;
	}
	export let coverImgSrc: string;
	export let publishedAt: string;
	export let title: string;
	export let tags: string[];
	export let description: string;
	export let readingTime: number;
	export let slug: string;

	let isHovered = false;

	$: dateString = getDateString(publishedAt);

	$: textStyle = cn("transition-colors", "duration-[800ms]", {
		"text-white": isHovered,
		"text-[#ffffff80]": !isHovered
	});

	const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
		const { currentTarget: target } = e;
		const rect = target.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		target.style.setProperty("--mouse-x", `${x}px`);
		target.style.setProperty("--mouse-y", `${y}px`);
	};
</script>

<div
	{...$$restProps}
	class={cn(
		"w-[304px]",
		"flex-col",
		"flex",
		"p-6",
		"border-[1px]",
		{
			"border-border": !isHovered,
			"border-[#5b5b5b]": isHovered
		},
		"transition-all",
		"duration-[300ms]",
		"rounded-[20px]",
		"gap-y-3",
		"relative",
		"card",
		"overflow-hidden",
		"before:pointer-events-none"
	)}
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}
	on:mousemove={handleMouseMove}
	role="group"
>
	<ImageLoader
		src={coverImgSrc}
		alt={`$${title}-cover-imgae`}
		class="rounded-[12.6px]"
		fetchpriority="high"
		width="256"
		height="144"
		wrapperClass="w-[256px] h-[144px] rounded-[12.6px]"
	/>
	<div
		class={textVariant({
			size: "subheading",
			class: cn("font-bold", textStyle)
		})}
	>
		{title}
	</div>
	<div class={cn(textVariant({ size: "subheading" }), "text-[18px]", "text-[#ffffff80]")}>
		{dateString}
	</div>
	<div class={cn("flex", "flex-row", "flex-wrap")}>
		{#each tags as tag}
			<Tag content={tag} class="mr-1 mb-1" />
		{/each}
	</div>
	<div class={cn(textVariant(), "text-[14px]", "text-text02")}>{description}</div>
	<div class={cn("flex", "flex-row", "justify-between")}>
		<div class={textVariant({ size: "h6", class: cn("text-text02") })}>
			{`${Array.from({ length: Math.ceil(readingTime / 10) }, (_) => "⌛").join(
				""
			)} ${readingTime} min read`}
		</div>
		<a href={slug} data-sveltekit-preload-data>
			<div
				class={cn(
					textVariant({ size: "h4" }),
					"bg-clip-text",
					"bg-gradient-to-r",
					"from-primary",
					"to-accent",
					"text-transparent",
					"mr-[6px]",
					"flex",
					"items-center",
					"cursor-pointer"
				)}
			>
				<div class="cursor-pointer">Read</div>
				<ChevronRight
					size="20px"
					color="#9F3AE0"
					class={cn("relative", "transition-all", "duration-[500ms]", {
						"left-[6px]": isHovered,
						"left-[0px]": !isHovered
					})}
				/>
			</div></a
		>
	</div>
</div>

<style>
	.card {
		position: relative;
		--mouse-x: 0px;
		--mouse-y: 0px;
	}
	.card::before {
		content: "";
		position: absolute;
		background: radial-gradient(
			circle at var(--mouse-x) var(--mouse-y),
			#7d00c925,
			transparent 80%
		);
		border-radius: inherit;
		inset: -5px;
		transition: 1s;
		opacity: 0;
	}
	.card:hover::before {
		opacity: 1;
	}
</style>
