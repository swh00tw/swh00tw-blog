<script lang="ts">
	import { cn } from "@/lib/cn";
	import { textVariant } from "@/lib/variants";
	import type { HTMLAttributes, MouseEventHandler } from "svelte/elements";
	import Tag from "$lib/components/Tag/index.svelte";
	import { ChevronRight } from "lucide-svelte";

	interface $$Props extends HTMLAttributes<HTMLDivElement> {
		coverImgSrc: string;
		publishedAt: string;
		title: string;
		tags: string[];
		description: string;
		readingTime: number;
	}
	export let coverImgSrc: string;
	export let publishedAt: string;
	export let title: string;
	export let tags: string[];
	export let description: string;
	export let readingTime: number;

	let isHovered = false;

	const getDateString = (date: string) => {
		const dateObj = new Date(date);
		const dateTimeFormat = new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric"
		});
		return dateTimeFormat.format(dateObj);
	};
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
		"overflow-hidden"
	)}
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}
	on:mousemove={handleMouseMove}
	role="group"
>
	<img src={coverImgSrc} alt={`$${title}-cover-imgae`} />
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
			<p>Read</p>
			<ChevronRight
				size="20px"
				color="#9F3AE0"
				class={cn("relative", "transition-all", "duration-[500ms]", {
					"left-[6px]": isHovered,
					"left-[0px]": !isHovered
				})}
			/>
		</div>
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
