<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import Cross from '$lib/icons/Cross.svelte';
	import cn from '$lib/utils/cn';
	import { slide } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import Modal from '$lib/components/Modal.svelte';
	import toast from 'svelte-french-toast';
	import SettingSelect from '$lib/features/storyboards/components/SettingSelect.svelte';

	const dispatch = createEventDispatcher();

	const settings = {
		lessonType: ['training', 'marketing', 'explainer', 'product tour', 'corporate'],
		lessonFor: ['customers', 'employees', 'parents', 'sales enablement'],
		tone: ['professional', 'informative', 'confident', 'positive', 'friendly', 'helpful']
	};

	let aboutLesson: string = '';
	let advancedSettingsOpen = false;
	let selectedSettings = {
		lessonType: '',
		lessonFor: '',
		tone: ''
	};

	function handleSubmit() {
		if (!aboutLesson.trim()) {
			toast.error('Please provide a description');
			return;
		}

		const content =
			`AI Enhanced Content: ${aboutLesson.trim()}` +
			(advancedSettingsOpen
				? `${selectedSettings.lessonType ? ` Lesson Type: ${selectedSettings.lessonType}` : ''}${selectedSettings.lessonFor ? ` Lesson For: ${selectedSettings.lessonFor}` : ''}${selectedSettings.tone ? ` Tone: ${selectedSettings.tone}` : ''}`
				: '');

		dispatch('create', { aboutLesson: content });
	}

	function closeModal() {
		dispatch('close');
	}
</script>

<Modal on:close={closeModal}>
	<div class="flex items-center justify-between py-0.5">
		<h2 class="font-medium leading-normal">Generate with AI</h2>
		<Button style={'ghost'} on:click={closeModal}>
			<Cross className="size-5 fill-zinc-500" />
		</Button>
	</div>

	<p class="sr-only">Get started with AI to generate a lesson from a file or URL.</p>

	<div>
		<label for="about-lesson" class="block text-sm text-zinc-500">
			What should this lesson be about?
		</label>
		<textarea
			id="about-lesson"
			bind:value={aboutLesson}
			placeholder="Create a storyboard for a customer education lesson on designing an effective curriculum using our platform. Highlight the process of creating courses, organizing materials, and sharing content with learners, incorporating visual elements and step-by-step guides."
			aria-label="About the lesson"
			class="mt-6 size-full h-[150px] rounded-lg border border-zinc-200 p-3 text-sm"
		/>

		{#if advancedSettingsOpen}
			<div transition:slide={{ duration: 300, easing: expoOut }} class="space-y-6 pt-6">
				<SettingSelect
					title="Lesson Type"
					setting="lessonType"
					settingList={settings}
					{selectedSettings}
				/>
				<SettingSelect
					title="Lesson For"
					setting="lessonFor"
					settingList={settings}
					{selectedSettings}
				/>
				<SettingSelect title="Tone" setting="tone" settingList={settings} {selectedSettings} />
			</div>
		{/if}
	</div>

	<div class="flex items-center justify-between">
		<label class="relative flex cursor-pointer touch-none items-center gap-x-2">
			<span
				class="absolute -m-1 h-1 w-1 overflow-hidden whitespace-nowrap border-0 p-0 [clip-path:_inset(50%)] [clip:rect(0px,_0px,_0px,_0px)]"
			>
				<input
					type="checkbox"
					role="switch"
					aria-checked={advancedSettingsOpen}
					aria-label="Show advanced settings"
					value={advancedSettingsOpen}
					on:input={() => (advancedSettingsOpen = !advancedSettingsOpen)}
				/>
			</span>
			<span
				aria-hidden="true"
				class={cn(
					'block h-4 w-7 rounded-full bg-zinc-200 p-0.5 transition-colors',
					advancedSettingsOpen && 'bg-musk'
				)}
			>
				<span
					class={cn(
						'block size-3 rounded-full bg-white transition-all',
						advancedSettingsOpen && 'ml-3'
					)}
				/>
			</span>
			<span class="text-sm text-zinc-500">Advance</span>
		</label>
		<Button style={'solid'} on:click={handleSubmit} className="px-4 py-2">Create</Button>
	</div>
</Modal>
