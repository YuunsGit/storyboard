<script lang="ts">
	import { createEventDispatcher, tick } from 'svelte';
	import Check from '$lib/icons/Check.svelte';
	import Cross from '$lib/icons/Cross.svelte';
	import cn from '$lib/utils/cn';
	import { inPlaceEditStore } from '$lib/stores';

	let isEditing = false;
	let editedValue = '';
	let input: HTMLTextAreaElement;
	let saveButton: HTMLButtonElement;
	let content: HTMLSpanElement;
	export let label;
	export let value: string;
	export let limitWidth = false;
	export let limitRows = false;
	export let placeholder = '';
	export let labelClass = '';

	const dispatch = createEventDispatcher<{
		save: { value: string };
	}>();

	function startEditing() {
		if (isEditing) return;
		editedValue = value;
		isEditing = true;
		const contentHeight = content.clientHeight;
		tick().then(() => {
			inPlaceEditStore.set(input);
			input.style.height = `${contentHeight}px`;
			input.focus();
			input.setSelectionRange(0, 0);
			input.scroll(0, 0);
		});
	}

	function submit() {
		const trimmedValue = editedValue.trim();
		if (!trimmedValue) return;
		isEditing = false;
		if (trimmedValue !== value) {
			dispatch('save', { value: trimmedValue });
		}
	}

	function cancel() {
		editedValue = '';
		isEditing = false;
		inPlaceEditStore.set(null);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			submit();
		} else if (event.key === 'Escape') {
			event.preventDefault();
			cancel();
		}
	}

	$: editedValue = editedValue.replace(/\n/g, '');

	$: {
		if ($inPlaceEditStore && $inPlaceEditStore !== input) {
			tick().then(() => cancel());
		}
	}
</script>

<form
	role="presentation"
	class="group relative flex items-center"
	on:click={startEditing}
	on:submit|preventDefault|stopPropagation={submit}
>
	{#if isEditing}
		<textarea
			bind:value={editedValue}
			bind:this={input}
			class={cn(
				'w-full rounded bg-zinc-100 px-1 leading-normal',
				limitRows && 'resize-none overflow-x-hidden whitespace-nowrap'
			)}
			rows={(limitRows && 1) || null}
			spellcheck="false"
			aria-required="true"
			{placeholder}
			on:keydown={handleKeydown}
			on:blur={(event) => {
				if (!event.target || event.target === saveButton) cancel();
			}}
		/>
		<div class="absolute right-0 top-[calc(100%_+_2px)] z-10">
			<button
				type="submit"
				bind:this={saveButton}
				class="size-8 rounded border bg-white shadow transition-colors hover:bg-zinc-100"
			>
				<Check className="mx-auto size-4 fill-green-500" />
				<span class="sr-only">Save</span>
			</button>
			<button
				on:click|stopPropagation={cancel}
				type="button"
				class="size-8 rounded border bg-white shadow transition-colors hover:bg-zinc-100"
			>
				<Cross className="mx-auto size-4 fill-red-500" />
				<span class="sr-only">Cancel</span>
			</button>
		</div>
	{:else}
		<button type="button" class="peer m-0 block appearance-none p-0" aria-label={label} />
		<span
			bind:this={content}
			class={cn(
				'relative z-0 w-full rounded-sm px-1 text-left leading-normal before:absolute before:inset-0 before:-z-10 before:rounded before:transition-colors group-hover:before:bg-zinc-100 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[-webkit-focus-ring-color]',
				limitWidth && 'max-w-[216px]',
				limitRows && 'line-clamp-1 break-all',
				!value && 'text-zinc-400',
				labelClass
			)}
		>
			{value || placeholder}
		</span>
	{/if}
</form>
