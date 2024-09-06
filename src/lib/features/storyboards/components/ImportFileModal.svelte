<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import Cross from '$lib/icons/Cross.svelte';
	import Dropzone from 'svelte-file-dropzone';
	import cn from '$lib/utils/cn';
	import Upload from '$lib/icons/Upload.svelte';
	import AcceptedFiles from '$lib/icons/AcceptedFiles.svelte';
	import Pdf from '$lib/icons/Pdf.svelte';
	import Delete from '$lib/icons/Delete.svelte';
	import { slide } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import Info from '$lib/icons/Info.svelte';
	import UrlFormats from '$lib/icons/UrlFormats.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import toast from 'svelte-french-toast';

	const dispatch = createEventDispatcher();

	let selectedFile: string | undefined;
	let urlInput: HTMLInputElement;
	let fileInput: HTMLInputElement;
	let aboutLesson: string = '';
	let selectedOption: 'upload' | 'url' = 'upload';
	export let mode: 'create' | 'upload' = 'create';

	function handleSubmit() {
		if (selectedOption === 'upload') {
			if (selectedFile) {
				dispatch('create', { file: selectedFile, aboutLesson: aboutLesson.trim() });
			} else {
				toast.error('Please upload a file');
			}
		} else if (selectedOption === 'url') {
			if (urlInput.value) {
				dispatch('create', { file: urlInput.value, aboutLesson: aboutLesson.trim() });
			} else {
				toast.error('Please provide a URL');
			}
		}
	}

	function handleFileUpload(e: { detail: { acceptedFiles: File[] } }) {
		if (e.detail?.acceptedFiles?.[0]) {
			selectedFile = e.detail.acceptedFiles[0].name;
		}
	}

	function resetFileInput() {
		selectedFile = undefined;
	}

	function closeModal() {
		dispatch('close');
	}
</script>

<Modal on:close={closeModal}>
	<div class="flex items-center justify-between py-0.5">
		<h2 class="font-medium leading-normal">Import File</h2>
		<Button style={'ghost'} on:click={closeModal}>
			<Cross className="size-5 fill-zinc-500" />
		</Button>
	</div>

	<p class="sr-only">
		Choose to upload a file or import from URL, then provide optional information about the lesson.
	</p>

	<div role="radiogroup" aria-label="Choose import option" class="space-y-4">
		<label
			class={cn(
				'block space-y-4 rounded-lg border p-4',
				selectedOption === 'upload' ? 'border-musk' : 'border-zinc-200'
			)}
		>
			<span class="flex items-center gap-x-1.5 text-sm font-medium">
				<input
					type="radio"
					bind:group={selectedOption}
					value="upload"
					class="relative size-4 appearance-none rounded-full border border-zinc-200 p-1 after:absolute after:inset-1 after:rounded-full after:bg-musk after:opacity-0 after:content-[''] checked:border-musk checked:after:opacity-100"
				/>
				Upload File
			</span>
			{#if selectedOption === 'upload'}
				<div transition:slide={{ duration: 300, easing: expoOut }}>
					{#if selectedFile}
						<div class="flex items-center gap-x-4 rounded-lg border border-zinc-200 p-4">
							<Pdf className="size-5" />
							<p class="line-clamp-1 max-w-80 overflow-hidden break-all text-sm">
								{selectedFile}
							</p>
							<Button style={'ghost'} on:click={resetFileInput} className="ml-auto !p-1">
								<Delete className="size-5" />
							</Button>
						</div>
					{:else}
						<div class="space-y-4">
							<Dropzone
								containerClasses="flex items-center flex-col justify-center gap-2.5 rounded-lg border-2 border-dashed border-zinc-200 bg-zinc-50 p-4"
								multiple={false}
								disableDefaultStyles={true}
								inputElement={fileInput}
								on:drop={handleFileUpload}
							>
								<Upload className="size-10" />
								<p class="space-y-1.5 text-center text-sm max-md:hidden">
									<span class="block font-medium">Click to Upload</span>
									<span class="block text-zinc-500">or drag and drop </span>
								</p>
								<p class="text-center text-sm md:hidden">
									<span class="block font-medium">Tap to Upload</span>
								</p>
							</Dropzone>
							<AcceptedFiles className="h-5" />
						</div>
					{/if}
				</div>
			{/if}
		</label>
		<label
			class={cn(
				'block space-y-4 rounded-lg border p-4',
				selectedOption === 'url' ? 'border-musk' : 'border-zinc-200'
			)}
		>
			<span class="flex items-center gap-x-1.5 text-sm font-medium">
				<input
					type="radio"
					bind:group={selectedOption}
					value="url"
					class="relative size-4 appearance-none rounded-full border border-zinc-200 p-1 after:absolute after:inset-1 after:rounded-full after:bg-musk after:opacity-0 after:content-[''] checked:border-musk checked:after:opacity-100"
				/>
				Import from URL
			</span>
			{#if selectedOption === 'url'}
				<div class="origin-top space-y-4" transition:slide={{ duration: 300, easing: expoOut }}>
					<div class="space-y-2">
						<input
							type="url"
							bind:this={urlInput}
							class="w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm placeholder-zinc-400"
							placeholder="Add file URL"
						/>
						<p class="flex items-center gap-x-1 text-xs text-zinc-400">
							<Info className="size-4" />
							Sharing option of the file must be “Public”.
						</p>
					</div>
					<UrlFormats className="h-5" />
				</div>
			{/if}
		</label>
	</div>

	{#if mode === 'create'}
		<div class="mt-4 flex flex-col gap-y-1">
			<label for="about-lesson" class="text-sm font-medium">
				About Lesson <span class="font-normal text-zinc-500">(Optional)</span>
			</label>
			<textarea
				id="about-lesson"
				bind:value={aboutLesson}
				placeholder="Tell us more about the lesson you want to create"
				aria-label="About the lesson"
				class="rounded-lg border border-zinc-200 p-3 text-sm"
			/>
		</div>
	{/if}

	<Button style={'solid'} on:click={handleSubmit} className="ml-auto px-4 py-2">Create</Button>
</Modal>
