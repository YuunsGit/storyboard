<script lang="ts">
	import { Drawer } from 'vaul-svelte';
	import EditInPlaceText from '$lib/components/EditInPlaceText.svelte';
	import SelectDropdown from '$lib/components/SelectDropdown.svelte';
	import Ellipsis from '$lib/icons/Ellipsis.svelte';
	import EditButtonText from '$lib/components/EditButtonText.svelte';
	import { getContextClient, mutationStore, type OperationResultStore } from '@urql/svelte';
	import { EditLessonDocument, type EditLessonMutation } from '$lib/gql/graphql';
	import { lesson } from '$lib/features/lessons/stores';
	import toast from 'svelte-french-toast';

	let updatedLessonStore: OperationResultStore<EditLessonMutation>;
	let client = getContextClient();

	const updateLessonTitle = (e: CustomEvent<{ value: string }>) => {
		updatedLessonStore = mutationStore<EditLessonMutation>({
			client,
			query: EditLessonDocument,
			variables: {
				id: $lesson?.id,
				input: {
					title: e.detail.value
				}
			}
		});
	};

	$: {
		if ($updatedLessonStore)
			if ($updatedLessonStore.error) {
				toast.error('Failed to update lesson title');
			} else if ($updatedLessonStore.data) {
				toast.success('Lesson title updated successfully');
			}
	}

	$: options =
		$lesson?.versions
			?.filter((version) => version)
			.map((version) => ({
				value: version.toString(),
				label: `V${version}`
			})) || [];
</script>

<div>
	<div class="flex items-center gap-x-2 max-lg:hidden">
		{#if !$lesson || ($updatedLessonStore && $updatedLessonStore.fetching)}
			<div class="h-5 w-32 animate-pulse rounded-lg bg-zinc-100" aria-hidden="true" />
		{:else}
			<h2 class="text-lg font-medium">
				<EditInPlaceText
					value={$lesson.title || 'Lesson Name'}
					label="Edit lesson name"
					on:save={updateLessonTitle}
				/>
			</h2>
			<SelectDropdown mode="dropdown" label="Select version" name="version-menu" {options} />
		{/if}
	</div>
	<Drawer.Root>
		<Drawer.Trigger
			class="rounded-md p-1 transition-colors hover:bg-zinc-100 active:bg-zinc-200 lg:hidden lg:rounded-lg"
		>
			<Ellipsis className="size-5" />
			<span class="sr-only">Lesson properties</span>
		</Drawer.Trigger>
		<Drawer.Portal>
			<Drawer.Overlay class="fixed inset-0 z-50 bg-zinc-900/60" />
			<Drawer.Content
				class="fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col space-y-4 rounded-t-lg border bg-white px-4 py-6"
			>
				<h2 class="text-lg font-medium">
					<EditButtonText value={$lesson?.title || ''} on:save={updateLessonTitle} />
				</h2>
				<div role="separator" aria-orientation="vertical" class="h-[1px] w-full bg-zinc-200" />
				<SelectDropdown mode="drawer" label="Select version" name="version-menu-mobile" {options} />
			</Drawer.Content>
		</Drawer.Portal>
	</Drawer.Root>
</div>
