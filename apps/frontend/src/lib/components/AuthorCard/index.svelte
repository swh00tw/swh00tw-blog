<script lang="ts">
	import { cn } from "$lib/cn";
	import { textVariant } from "@/lib/variants";
	import Link from "$lib/components/Link/index.svelte";

	interface $$Props {
		prevUrl?: string;
		nextUrl?: string;
	}
	export let prevUrl: string | undefined = undefined;
	export let nextUrl: string | undefined = undefined;
</script>

<div
	class={cn(
		"flex",
		"flex-col",
		"justify-start",
		"items-center",
		"gap-y-[24px]",
		"w-full",
		"mx-auto",
		"px-12",
		"py-6",
		"md:flex-row",
		"lg:w-[60vw]",
		"md:w-fit",
		"md:gap-x-[64px]",
		"lg:gap-x-[96px]"
	)}
>
	<img
		src="/avatar.png"
		alt="avatar"
		class={cn("w-[100px]", "h-[100px]", "rounded-full", "object-cover")}
	/>
	<div class={cn("flex-col", "flex", "gap-y-2", "w-full")}>
		<p class={cn(textVariant({ class: "text-[14px] text-text02" }))}>About author...</p>
		<div class={cn(textVariant({ size: "heading" }), "text-[24px]")}>Shu-Wei (Frank) Hsu</div>
		<div class={cn(textVariant({ size: "subheading", class: cn("text-text02") }), "text-[18px]")}>
			📍 NY-based Full stack Dev 🗽
		</div>
		<div class={cn(textVariant(), "text-[14px]", "text-text02")}>
			Passionate about Web Development and UI/UX.
		</div>
		<div class={cn("flex", "gap-x-[15px]")}>
			<a href="https://www.linkedin.com/in/swh00tw/" target="_blank">
				<img src="/Logos/linkedin-plain.png" alt="linkedin" />
			</a>
			<a href="https://github.com/swh00tw" target="_blank">
				<img src="/Logos/github-original.png" alt="github" />
			</a>
			<a href="https://www.threads.net/@swh00tw/post/Cv1DvVSNeXy" target="_blank">
				<img src="/Logos/threads.png" alt="threads" />
			</a>
			<a href="mailto:a6140000@gmail.com">
				<img src="/Logos/mail.png" alt="email" />
			</a>
		</div>
	</div>
</div>
<div class={cn("w-full", "md:w-[87vw]", "lg:w-[60vw]", "relative", "mt-12", "pb-6", "mx-auto")}>
	{#if prevUrl}
		<Link href={prevUrl} content={"< Prev Post"} class={cn("absolute", "left-[24px]")} />
	{/if}
	{#if nextUrl}
		<Link href={nextUrl} content={"Next Post >"} class={cn("absolute", "right-[24px]")} />
	{/if}
</div>
