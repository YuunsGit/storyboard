<script lang="ts">
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import cn from '$lib/utils/cn';
	import Expand from '$lib/icons/Expand.svelte';
	import Check from '$lib/icons/Check.svelte';
	import { createEventDispatcher } from 'svelte';

	type Option = {
		value: string;
		label: string;
	};

	let isOpen = false;
	let focusedIndex = -1;
	let dropdown: HTMLDivElement;

	const dispatch = createEventDispatcher();

	export let mode: 'drawer' | 'dropdown';
	export let name: string;
	export let label: string;
	export let options: Option[];
	export let selected: Option = options[0];

	function toggleDropdown() {
		isOpen = !isOpen;
		if (isOpen) {
			focusedIndex = options.findIndex((option) => option === selected);
		} else {
			focusedIndex = -1;
		}
	}

	function selectOption(option: Option) {
		selected = option;
		dispatch('submit', { value: selected.value });
		toggleDropdown();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!isOpen) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				focusedIndex = (focusedIndex + 1) % options.length;
				break;
			case 'ArrowUp':
				event.preventDefault();
				focusedIndex = (focusedIndex - 1 + options.length) % options.length;
				break;
			case 'Enter':
				event.preventDefault();
				selectOption(options[focusedIndex]);
				break;
			case 'Escape':
				event.preventDefault();
				toggleDropdown();
				break;
		}
	}

	function handleFocusOut(event: FocusEvent) {
		if (dropdown && !dropdown.contains(event.relatedTarget as Node)) {
			isOpen = false;
			focusedIndex = -1;
		}
	}

	$: if (isOpen && focusedIndex >= 0) {
		const focusedElement = document.getElementById(`option-${name}-${focusedIndex}`);
		if (focusedElement) {
			focusedElement.focus();
		}
	}
</script>

{#if mode === 'dropdown'}
	<div class="relative" on:focusout={handleFocusOut}>
		<button
			id={`trigger-${name}`}
			aria-haspopup="listbox"
			aria-expanded={isOpen}
			aria-controls={isOpen ? `menu-${name}` : null}
			class="flex min-w-14 items-center gap-x-2 rounded-lg bg-zinc-100 px-2 py-1.5 text-xs text-zinc-600 transition-colors hover:bg-zinc-200 active:bg-zinc-300"
			on:click={toggleDropdown}
			on:keydown={handleKeydown}
		>
			{selected.label}
			<Expand className={cn('size-3 fill-zinc-400', isOpen && 'rotate-180')} />
		</button>
		{#if isOpen}
			<div
				bind:this={dropdown}
				id={`menu-${name}`}
				role="listbox"
				aria-hidden={!isOpen}
				aria-labelledby={`trigger-${name}`}
				aria-label={label}
				tabindex="-1"
				class="absolute top-[calc(100%_+_4px)] flex min-w-20 origin-top flex-col gap-y-2 rounded-lg bg-white p-2 shadow-lg"
				transition:scale={{ duration: 100, start: 0.9, opacity: 0, easing: quintOut }}
				on:keydown={handleKeydown}
			>
				{#each options as option, index}
					<button
						id={`option-${name}-${index}`}
						role="option"
						tabindex="-1"
						aria-selected={selected === option}
						on:click={() => selectOption(option)}
						class={cn(
							'w-full rounded-lg p-2 text-left hover:bg-zinc-200 active:bg-zinc-300',
							selected === option && 'bg-zinc-100 font-medium'
						)}
					>
						{option.label}
					</button>
				{/each}
			</div>
		{/if}
	</div>
{:else if mode === 'drawer'}
	<div role="listbox" aria-label={label} class="space-y-4">
		{#each options as option, index}
			<button
				id={`option-${name}-${index}`}
				role="option"
				aria-selected={selected === option}
				on:click={() => selectOption(option)}
				class={cn(
					'flex w-full items-center justify-between rounded-lg p-2 text-left text-sm',
					selected === option && 'bg-zinc-100 font-medium'
				)}
			>
				{option.label}
				{#if selected === option}
					<Check className="size-5 fill-zinc-500" />
				{/if}
			</button>
		{/each}
	</div>
{/if}
