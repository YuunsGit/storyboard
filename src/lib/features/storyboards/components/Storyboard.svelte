<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import EditInPlaceText from '$lib/components/EditInPlaceText.svelte';
	import Attach from '$lib/icons/Attach.svelte';
	import Content from '$lib/icons/Content.svelte';
	import Plus from '$lib/icons/Plus.svelte';
	import Title from '$lib/icons/Title.svelte';
	import Cross from '$lib/icons/Cross.svelte';
	import Delete from '$lib/icons/Delete.svelte';
	import type { Storyboard } from '$lib/features/storyboards/types';
	import toast from 'svelte-french-toast';
	import { getContextClient } from '@urql/svelte';
	import ImportFileModal from '$lib/features/storyboards/components/ImportFileModal.svelte';
	import { uploadFile } from '$lib/features/files/utils';
	import { removeStoryboard, updateStoryboard } from '$lib/features/storyboards/utils';
	import Comments from '$lib/features/comments/components/Comments.svelte';
	import Files from '$lib/features/files/Files.svelte';

	export let storyboard: Storyboard;
	export let index: number;
	let fileUploadModalOpen = false;

	let client = getContextClient();

	function handleDeleteStoryboard() {
		if (!storyboard.id) return;
		toast.promise(removeStoryboard(client, storyboard.id), {
			loading: 'Deleting...',
			success: 'Storyboard deleted',
			error: (error) => error.message
		});
	}

	function handleEditTitle(e: CustomEvent<{ value: string }>) {
		toast.promise(updateStoryboard(client, { id: storyboard.id, title: e.detail.value }), {
			loading: 'Saving...',
			success: 'Storyboard title updated',
			error: 'Failed to update storyboard title'
		});
	}

	function handleEditContent(e: CustomEvent<{ value: string }>) {
		toast.promise(updateStoryboard(client, { id: storyboard.id, content: e.detail.value }), {
			loading: 'Saving...',
			success: 'Storyboard content updated',
			error: 'Failed to update storyboard content'
		});
	}

	function handleFileUpload(e: CustomEvent<{ file: string }>) {
		if (!storyboard.id) return;
		toast.promise(
			uploadFile(client, storyboard.id, e.detail.file).finally(() => {
				fileUploadModalOpen = false;
			}),
			{
				loading: 'Saving...',
				success: 'File attached',
				error: (error) => error.message
			}
		);
	}

	$: imgUrl = `https://placehold.co/366x206/9FB9B0/507776?text=${encodeURIComponent(storyboard.title || 'Storyboard')}&font=montserrat`;
</script>

<div
	class="h-fit min-w-[271px] max-w-[271px] rounded-lg border border-zinc-200 bg-white md:min-w-[366px] md:max-w-[366px]"
>
	<div class="flex items-center justify-between px-3 py-1">
		<div
			class="size-[26px] content-center rounded-full border border-zinc-200 text-center text-xs text-zinc-500"
		>
			{index.toLocaleString('en-US', {
				minimumIntegerDigits: 2,
				useGrouping: false
			})}
		</div>
		<Button style={'ghost'} on:click={handleDeleteStoryboard} className="!p-1">
			<Delete className="size-5 fill-zinc-500" />
			<span class="sr-only">Delete</span>
		</Button>
	</div>
	<div>
		<img src={imgUrl} alt={storyboard.title} class="h-[206px] w-full object-cover" />
	</div>
	<div class="p-3 pt-0">
		<div class="flex items-center gap-x-2 border-b border-zinc-200 py-3">
			<Title className="size-5 flex-shrink-0" />
			<h5 class="w-full font-medium">
				<EditInPlaceText
					value={storyboard.title || ''}
					label="Edit storyboard title"
					placeholder="Enter a title"
					limitRows={true}
					on:save={handleEditTitle}
				/>
			</h5>
		</div>
		<div class="flex gap-x-2 border-b border-zinc-200 py-3">
			<Content className="size-5 flex-shrink-0 my-0.5" />
			<h6 class="w-full text-sm text-zinc-500">
				<EditInPlaceText
					value={storyboard.content || ''}
					label="Edit storyboard content"
					placeholder="Enter a description"
					labelClass={!storyboard.content ? 'min-h-[176px]' : ''}
					on:save={handleEditContent}
				/>
			</h6>
		</div>
		<div class="flex items-center gap-x-3 border-b border-zinc-200 py-3">
			<Attach className="size-5 flex-shrink-0 my-0.5" />
			<Files {storyboard} />
			<Button
				style={'outlined'}
				on:click={() => (fileUploadModalOpen = true)}
				className="!p-[3px] !border"
			>
				<Plus className="size-5 fill-zinc-500" />
				<span class="sr-only">Attach file</span>
			</Button>
		</div>
		<Comments {storyboard} />
	</div>
</div>

{#if fileUploadModalOpen}
	<ImportFileModal
		mode="upload"
		on:close={() => (fileUploadModalOpen = false)}
		on:create={handleFileUpload}
	/>
{/if}
