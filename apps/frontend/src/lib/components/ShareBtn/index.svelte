<script lang="ts">
	import Button from "$lib/components/Button/index.svelte";
	import { onMount } from "svelte";
	import { clickToCopy } from "$lib/copyToClipboard";
	import { navigatorShare } from "$lib/navigatorShare";
	import { Share, Link, Check } from "lucide-svelte";
	import { page } from "$app/stores";

	interface $$Props {
		url: string;
	}
	export let url: string;

	let isNavigatorAvailable: boolean | undefined = undefined;
	onMount(() => {
		isNavigatorAvailable =
			typeof window !== "undefined" && navigator && navigator?.share !== undefined;
	});

	let copied = false;

	$: shareData = {
		url: url,
		title: $page?.data?.meta?.title ?? "swh00tw.dev",
		text: $page?.data?.meta?.description ?? "Check out this post on swh00tw.dev"
	};
</script>

<Button variant="unstyled"
	><div>
		{#if isNavigatorAvailable === undefined}
			<div />
		{:else if isNavigatorAvailable === false}
			<div
				class="flex flex-row items-center gap-x-1"
				use:clickToCopy={{
					url: url
				}}
				on:copysuccess={() => {
					copied = true;
					setTimeout(() => {
						copied = false;
					}, 15000);
				}}
			>
				{#if copied}
					<Check size="14" />
				{:else}
					<Link size="14" />
				{/if}
				{#if copied}
					Copied
				{:else}
					Link
				{/if}
			</div>
		{:else}
			<div
				class="flex flex-row items-center gap-x-1"
				use:navigatorShare={{
					data: shareData
				}}
			>
				<Share size="14" />
				Share
			</div>
		{/if}
	</div></Button
>
