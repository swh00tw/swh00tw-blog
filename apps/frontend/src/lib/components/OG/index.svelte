<script lang="ts">
	import { cn } from "$lib/cn";
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
		"lg:gap-x-[160px]",
		"og"
	)}
>
	<div class={cn("flex-col", "flex", "gap-y-4", "w-full")}>
		<div class={"text-[32px] font-bold"}>swh00tw.dev</div>
		<div class={"text-[24px] text-text02 font-medium"}>Personal blog by Frank Hsu</div>
		<div class={"text-text02"}>I write code and share random good shit.</div>
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
	<img
		src="/avatar.png"
		alt="avatar"
		class={cn("w-[160px]", "h-[160px]", "rounded-full", "object-cover")}
	/>
</div>

<style>
	.og {
		font-family: "DM Sans", sans-serif;
		background-color: #242424;
		color: #fff;
	}
</style>
