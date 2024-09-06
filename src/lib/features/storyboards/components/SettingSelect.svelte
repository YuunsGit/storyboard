<script lang="ts">
	import cn from '$lib/utils/cn.js';
	import { expoOut } from 'svelte/easing';
	import Check from '$lib/icons/Check.svelte';
	import Button from '$lib/components/Button.svelte';
	import { slide } from 'svelte/transition';

	export let setting: 'lessonType' | 'lessonFor' | 'tone';
	export let selectedSettings;
	export let settingList;
	export let title;
</script>

<div class="space-y-2">
	<h3 class="text-sm font-medium">{title}</h3>
	<div class="options flex gap-x-2 overflow-x-auto overflow-y-visible">
		{#each settingList[setting] as option}
			<Button
				style={'solid'}
				on:click={() => {
					if (selectedSettings[setting] === option) {
						selectedSettings[setting] = '';
					} else {
						selectedSettings[setting] = option;
					}
				}}
				className={cn(
					'rounded-lg flex items-center text-xs !py-1.5 font-normal !px-2 capitalize text-zinc-600 bg-zinc-100 hover:bg-zinc-100/90 active:bg-zinc-100/80 transition-none',
					selectedSettings[setting] === option && '!bg-[#E3F9DF] text-[#329821]'
				)}
			>
				{#if selectedSettings[setting] === option}
					<span
						class="block pr-1.5"
						transition:slide={{ duration: 200, axis: 'x', easing: expoOut }}
					>
						<Check className="size-3 fill-musk" />
					</span>
				{/if}
				<span class="whitespace-nowrap leading-[1.3]">{option}</span>
			</Button>
		{/each}
	</div>
</div>

<style>
	.options::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
	}
</style>
