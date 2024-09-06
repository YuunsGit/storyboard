<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Cross from '$lib/icons/Cross.svelte';
	import type { Storyboard } from '$lib/features/storyboards/types.js';
	import { expoOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';
	export let storyboard: Storyboard;
</script>

{#if storyboard.files && storyboard.files.length > 0}
	<div class="files flex items-center gap-x-2 overflow-x-auto overflow-y-visible">
		{#each storyboard?.files as file (file)}
			<div
				class="flex items-center gap-x-1 rounded-md border border-[#DEDEE1] bg-white px-3 py-[1px] text-sm font-medium leading-5 text-zinc-500"
				animate:flip={{ duration: 400, easing: expoOut }}
			>
				<span class="whitespace-nowrap px-1">
					{file}
				</span>
				<Button style={'ghost'} className="!p-1">
					<Cross className="size-4 fill-zinc-400" />
					<span class="sr-only">Detach file</span>
				</Button>
			</div>
		{/each}
	</div>
{/if}

<style>
	.files::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
	}
</style>
