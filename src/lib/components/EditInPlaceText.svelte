<script lang="ts">
	import { createEventDispatcher, tick } from 'svelte';
	import Check from '$lib/icons/Check.svelte';
	import Cross from '$lib/icons/Cross.svelte';

	let isEditing = false;
	let editedValue = '';
	let input: HTMLTextAreaElement;
	let saveButton: HTMLButtonElement;
	export let label;
	export let value: string;

	const dispatch = createEventDispatcher();

	function startEditing() {
		if (isEditing) return;
		editedValue = value;
		isEditing = true;
		tick().then(() => {
			input.focus();
			input.setSelectionRange(0, 0);
			input.scroll(0, 0);
		});
	}

	function submit() {
		const trimmedValue = editedValue.trim();
		if (!trimmedValue) return;
		if (trimmedValue !== value) dispatch('submit', { value: trimmedValue });
		value = trimmedValue;
		isEditing = false;
	}

	function cancel() {
		editedValue = '';
		isEditing = false;
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
</script>

<form
	role="presentation"
	class="relative z-0 flex items-center justify-center before:absolute before:-inset-x-1 before:inset-y-0 before:-z-10 before:rounded before:transition-colors hover:before:bg-zinc-100"
	on:click={startEditing}
	on:submit|preventDefault|stopPropagation={submit}
>
	{#if isEditing}
		<textarea
			bind:value={editedValue}
			bind:this={input}
			class="w-full resize-none overflow-x-hidden whitespace-nowrap rounded bg-zinc-100 px-1"
			rows="1"
			spellcheck="false"
			aria-required="true"
			on:keydown={handleKeydown}
			on:blur={(event) => {
				if (!event.target || event.target === saveButton) cancel();
			}}
		/>
		<div class="absolute right-0 top-[calc(100%_+_2px)]">
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
			class="line-clamp-1 w-max max-w-[216px] rounded-sm px-1 leading-[1.4] [word-break:break-all] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[-webkit-focus-ring-color]"
		>
			{editedValue || value}
		</span>
	{/if}
</form>
