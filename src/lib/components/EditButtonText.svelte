<script lang="ts">
	import { createEventDispatcher, tick } from 'svelte';
	import Check from '$lib/icons/Check.svelte';
	import Cross from '$lib/icons/Cross.svelte';
	import Edit from '$lib/icons/Edit.svelte';

	let isEditing = false;
	let editedValue = '';
	let input: HTMLTextAreaElement;
	export let value: string;

	const dispatch = createEventDispatcher<{
		save: { value: string };
	}>();

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
		if (trimmedValue !== value) dispatch('save', { value: trimmedValue });
		value = trimmedValue;
		isEditing = false;
	}

	function cancel() {
		editedValue = '';
		isEditing = false;
	}

	$: editedValue = editedValue.replace(/\n/g, '');
</script>

<form role="presentation" on:submit|preventDefault|stopPropagation={submit}>
	{#if isEditing}
		<span class="flex items-center gap-x-4">
			<textarea
				bind:value={editedValue}
				bind:this={input}
				class="w-full resize-none overflow-x-hidden whitespace-nowrap rounded bg-zinc-100 px-1"
				rows="1"
				spellcheck="false"
				aria-required="true"
			/>
			<span role="presentation" on:submit={submit} class="flex items-center justify-center gap-x-4">
				<button type="submit" class="transition-colors active:text-zinc-300">
					<Check className="size-5 fill-green-500" />
					<span class="sr-only">Save</span>
				</button>
				<button
					on:click|stopPropagation={cancel}
					type="button"
					class="transition-colors active:text-zinc-300"
				>
					<Cross className="size-5 fill-red-500" />
					<span class="sr-only">Cancel</span>
				</button>
			</span>
		</span>
	{:else}
		<span class="flex items-center space-x-2">
			<span
				class="line-clamp-1 w-max max-w-[216px] rounded-sm px-1 leading-[1.4] [word-break:break-all]"
			>
				{editedValue || value}
			</span>
			<button type="button" on:click={startEditing} class="transition-colors active:text-zinc-300">
				<Edit className="size-5" />
				<span class="sr-only">Edit</span>
			</button>
		</span>
	{/if}
</form>
