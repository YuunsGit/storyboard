<script lang="ts">
	import Storyboard from '$lib/features/storyboards/components/Storyboard.svelte';
	import NewCard from '$lib/features/storyboards/components/NewCard.svelte';
	import { storyboardsStore } from '$lib/features/storyboards/stores';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	let storyboardsContainer: HTMLDivElement;
	let leftEnd = false;
	let rightEnd = false;

	const handleScroll = () => {
		if (storyboardsContainer) {
			const { scrollLeft, scrollWidth, clientWidth } = storyboardsContainer;
			leftEnd = scrollLeft <= 20;
			rightEnd = scrollLeft + clientWidth >= scrollWidth - 20;
		}
	};

	onMount(() => {
		handleScroll();
		storyboardsContainer.addEventListener('scroll', handleScroll);
		return () => {
			storyboardsContainer.removeEventListener('scroll', handleScroll);
		};
	});

	$: {
		if ($storyboardsStore) {
			handleScroll();
		}
	}
</script>

{#if $storyboardsStore.data && $storyboardsStore.data.length > 0}
	<main class="relative py-6 md:px-5">
		<div
			class="shadow-container pointer-events-none absolute left-5 right-5 z-20 mx-auto h-[500px] max-w-screen-2xl max-md:hidden"
			aria-hidden="true"
		>
			{#if !leftEnd}
				<div
					class="absolute h-full w-6 bg-[linear-gradient(to_right,_rgba(0,_0,_0,_0.3)_0%,_rgba(0,_0,_0,_0)_100%)]"
				/>
			{/if}
			{#if !rightEnd}
				<div
					class="absolute right-0 h-full w-6 bg-[linear-gradient(to_left,_rgba(0,_0,_0,_0.3)_0%,_rgba(0,_0,_0,_0)_100%)]"
				/>
			{/if}
		</div>
		<div
			bind:this={storyboardsContainer}
			class="storyboards relative mx-auto max-w-screen-2xl overflow-x-scroll overscroll-x-contain max-md:px-5"
		>
			<div class="flex gap-x-8">
				{#each [...$storyboardsStore.data, { id: 'add-new' }] as storyboard, index (storyboard.id)}
					<div
						class="flex gap-x-[34px]"
						in:scale={{ duration: 300, opacity: 0, start: 0.95 }}
						animate:flip={{ duration: 400, easing: expoOut }}
					>
						{#if storyboard.id === 'add-new'}
							<NewCard />
						{:else}
							<Storyboard {storyboard} index={index + 1} />
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</main>
{/if}

<style>
	.storyboards::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
	}

	.shadow-container {
		--mask: linear-gradient(to bottom, transparent 0%, black 50%, transparent 100%) repeat-x;
		mask: var(--mask);
		-webkit-mask: var(--mask);
	}
</style>
