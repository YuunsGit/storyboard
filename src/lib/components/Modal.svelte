<script lang="ts">
	import { blur, fade, scale } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function closeModal() {
		dispatch('close');
	}
</script>

<div role="dialog" class="fixed inset-0 flex items-center justify-center px-6">
	<div
		class="absolute inset-0 bg-zinc-900/60"
		aria-hidden="true"
		in:fade={{ duration: 100, easing: quadOut }}
		out:fade={{ duration: 200, easing: quadOut }}
		on:click={closeModal}
	/>
	<div
		class="z-[99] flex w-full max-w-screen-sm flex-col gap-y-4 rounded-lg bg-white p-4 shadow-[0px_12px_16px_-4px_#09090B14,_0px_4px_6px_-2px_#09090B08] md:p-6"
		in:scale={{ duration: 100, start: 0.98, opacity: 0.6, easing: quadOut }}
		out:blur={{ duration: 200, amount: 10, easing: quadOut }}
	>
		<slot />
	</div>
</div>
