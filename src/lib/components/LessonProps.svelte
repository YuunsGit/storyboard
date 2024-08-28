<script>
	import EditInPlaceText from '$lib/components/EditInPlaceText.svelte';
	import SingleSelection from '$lib/components/SingleSelection.svelte';
	import Ellipsis from '$lib/icons/Ellipsis.svelte';
	import EditButtonText from '$lib/components/EditButtonText.svelte';
	import { Drawer } from 'vaul-svelte';
</script>

<div>
	<div class="flex items-center gap-x-2 max-lg:hidden">
		<h2 class="text-lg font-medium">
			<EditInPlaceText value="Lesson Name" label="Edit lesson name" on:submit={console.log} />
		</h2>
		<SingleSelection
			label="Select version"
			name="version-menu"
			options={[
				{ value: '1', label: 'V1' },
				{ value: '0', label: 'V0' }
			]}
		/>
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
					<EditButtonText value="Lesson Name" />
				</h2>
				<div role="separator" aria-orientation="vertical" class="h-[1px] w-full bg-zinc-200" />
			</Drawer.Content>
		</Drawer.Portal>
	</Drawer.Root>
</div>
