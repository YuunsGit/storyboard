<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Sprinkle from '$lib/icons/Sprinkle.svelte';
	import FileFormats from '$lib/icons/FileFormats.svelte';
	import Enter from '$lib/icons/Enter.svelte';
	import ImportFileModal from '$lib/features/storyboards/components/ImportFileModal.svelte';
	import { getContextClient } from '@urql/svelte';
	import toast from 'svelte-french-toast';
	import GenerateAIModal from '$lib/features/storyboards/components/GenerateAIModal.svelte';
	import { createStoryboard } from '$lib/features/storyboards/utils';

	let showModal: 'ai' | 'file' | 'manual' | undefined;

	let client = getContextClient();

	function handleCreateEmptyStoryboard() {
		toast.promise(createStoryboard(client, {}), {
			loading: 'Creating storyboard...',
			success: 'Storyboard created',
			error: (error) => error.message
		});
	}

	function handleCreateStoryboard(e: CustomEvent<{ file?: string; aboutLesson?: string }>) {
		toast.promise(
			createStoryboard(client, {
				file: e.detail.file,
				aboutLesson: e.detail.aboutLesson
			}).finally(() => {
				showModal = undefined;
			}),
			{
				loading: 'Creating storyboard...',
				success: 'Storyboard created',
				error: (error) => error.message
			}
		);
	}
</script>

<main class="size-full content-center p-6">
	<div class="mx-auto grid max-w-[1200px] gap-x-8 gap-y-6 md:grid-cols-3 lg:gap-x-10">
		<div class="flex flex-col gap-y-4 rounded-2xl bg-white p-6 md:gap-y-6">
			<div class="flex gap-x-4 gap-y-6 md:flex-col">
				<div
					class="flex w-full items-center justify-center rounded-lg bg-zinc-100 px-4 py-6 contain-content max-md:size-20 md:h-[200px]"
				>
					<Sprinkle className="size-24" />
				</div>
				<div class="space-y-1 md:space-y-3">
					<h2 class="text-xl font-medium leading-normal text-zinc-900 md:text-2xl">
						Generate with AI
					</h2>
					<p class="leading-normal text-zinc-500">Use AI to create storyboard</p>
				</div>
			</div>
			<Button
				style={'solid'}
				on:click={() => (showModal = 'ai')}
				className="rounded-lg mt-auto px-4 py-2 w-fit"
			>
				Create
			</Button>
		</div>

		<div class="flex flex-col gap-y-4 rounded-2xl bg-white p-6 md:gap-y-6">
			<div class="flex gap-x-4 gap-y-6 md:flex-col">
				<div
					class="flex w-full items-center justify-center rounded-lg bg-zinc-100 px-1 py-6 contain-content max-md:size-20 md:h-[200px] md:px-4"
				>
					<FileFormats className="w-[224px]" />
				</div>
				<div class="space-y-1 md:space-y-3">
					<h2 class="text-xl font-medium leading-normal text-zinc-900 md:text-2xl">
						Start with File
					</h2>
					<p class="leading-normal text-zinc-500">Import files to create storyboard from</p>
				</div>
			</div>
			<Button
				style={'solid'}
				on:click={() => (showModal = 'file')}
				className="rounded-lg px-4 mt-auto py-2 bg-zinc-900 w-fit hover:bg-zinc-900/90 active:bg-zinc-900/80"
			>
				Import
			</Button>
		</div>

		<div class="flex flex-col gap-y-4 rounded-2xl bg-white p-6 md:gap-y-6">
			<div class="flex gap-x-4 gap-y-6 md:flex-col">
				<div
					class="flex w-full items-center justify-center rounded-lg bg-zinc-100 px-4 py-6 contain-content max-md:size-20 md:h-[200px]"
				>
					<Enter className="h-24" />
				</div>
				<div class="space-y-1 md:space-y-3">
					<h2 class="text-xl font-medium leading-normal text-zinc-900 md:text-2xl">
						Create Manually
					</h2>
					<p class="leading-normal text-zinc-500">Create storyboard from scratch</p>
				</div>
			</div>
			<Button
				style={'solid'}
				on:click={handleCreateEmptyStoryboard}
				className="rounded-lg px-4 mt-auto py-2 bg-zinc-900 w-fit hover:bg-zinc-900/90 active:bg-zinc-900/80"
			>
				Start
			</Button>
		</div>
	</div>
</main>

{#if showModal === 'file'}
	<ImportFileModal on:close={() => (showModal = undefined)} on:create={handleCreateStoryboard} />
{:else if showModal === 'ai'}
	<GenerateAIModal on:close={() => (showModal = undefined)} on:create={handleCreateStoryboard} />
{/if}
