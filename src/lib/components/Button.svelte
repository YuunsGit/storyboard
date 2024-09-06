<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import cn from '$lib/utils/cn';

	export let type: HTMLButtonElement['type'] = 'button';
	export let disabled = false;
	export let style: 'outlined' | 'solid' | 'ghost';
	export let className: string = '';

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('click');
	}

	let variantClass = '';

	switch (style) {
		case 'outlined':
			variantClass =
				'border-zinc-200 bg-white p-1 transition-colors hover:bg-zinc-100 active:bg-zinc-200 lg:rounded-lg lg:border lg:p-2';
			break;
		case 'solid':
			variantClass =
				'bg-musk px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-musk/90 active:bg-musk/80 lg:rounded-lg lg:px-4 lg:py-2';
			break;
		case 'ghost':
			variantClass =
				'p-1 transition-colors hover:bg-zinc-100 active:bg-zinc-200 lg:rounded-lg lg:p-2';
			break;
	}
</script>

<button
	{type}
	{disabled}
	on:click={handleClick}
	class={cn(variantClass, 'rounded-md text-white', className)}
>
	<slot />
</button>
