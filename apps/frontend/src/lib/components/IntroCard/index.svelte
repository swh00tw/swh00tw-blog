<script lang="ts">
	import { cn } from "@/lib/cn";
	import { textVariant } from "@/lib/variants";
	import Link from "$lib/components/Link/index.svelte";
	import ImageLoader from "$lib/components/ImageLoader/index.svelte";
</script>

<div
	class={cn(
		"flex",
		"flex-col-reverse",
		"md:flex-row",
		"justify-center",
		"items-center",
		"gap-y-[20px]",
		"w-full",
		"md:w-fit",
		"md:gap-x-[100px]",
		"lg:gap-x-[160px]"
	)}
>
	<div class={cn("flex-col", "flex", "gap-y-4", "w-full")}>
		<div class={textVariant({ size: "heading" })}>swh00tw.dev</div>
		<div class={textVariant({ size: "subheading", class: cn("text-text02") })}>
			Personal blog by <Link content="Frank Hsu" href="https://swh00tw.me" />
		</div>
		<div class={textVariant({ size: "h4", class: cn("text-text02") })}>
			📍 NY-based Full stack Dev 🗽 <br /> 🗣️ Talk about tech, life, and everything in between
		</div>
		<div class={cn("flex", "gap-x-[15px]")}>
			<a href="https://www.linkedin.com/in/swh00tw/" target="_blank">
				<ImageLoader
					src="/Logos/linkedin-plain.png"
					alt="linkedin"
					class="w-[24px] h-[24px]"
					wrapperClass="w-[24px] h-[24px] rounded-full bg-background"
				/>
			</a>
			<a href="https://github.com/swh00tw" target="_blank">
				<ImageLoader
					src="/Logos/github-original.png"
					alt="github"
					class="w-[24px] h-[24px]"
					wrapperClass="w-[24px] h-[24px] rounded-full bg-background"
				/>
			</a>
			<a href="https://www.threads.net/@swh00tw/post/Cv1DvVSNeXy" target="_blank">
				<ImageLoader
					src="/Logos/threads.png"
					alt="threads"
					class="w-[20.65px] h-[24px]"
					wrapperClass="w-[20.65px] h-[24px] rounded-full bg-background"
				/>
			</a>
			<a href="mailto:a6140000@gmail.com">
				<ImageLoader
					src="/Logos/mail.png"
					alt="email"
					class="w-[28px] h-[24px]"
					wrapperClass="w-[28px] h-[24px] rounded-full bg-background"
				/>
			</a>
		</div>
	</div>
	<div class="w-[160px]">
		<ImageLoader
			src="/avatar_160.png"
			alt="avatar"
			class={cn("w-[160px]", "h-[160px]", "rounded-full", "object-cover")}
			wrapperClass={cn("w-[160px]", "h-[160px]", "rounded-full", "bg-background")}
		/>
	</div>
</div>
