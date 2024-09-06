<script>
	import Create from '$lib/icons/Create.svelte';
	import { getContextClient } from '@urql/svelte';
	import { createStoryboard } from '$lib/features/storyboards/utils';
	import toast from 'svelte-french-toast';

	let client = getContextClient();

	const handleCreate = () => {
		toast.promise(createStoryboard(client, {}), {
			loading: 'Creating storyboard...',
			success: 'Storyboard created',
			error: (error) => error.message
		});
	};
</script>

<div
	class="h-[455px] min-w-[271px] max-w-[271px] content-center rounded-lg bg-[#DEDEE1] md:min-w-[366px] md:max-w-[366px]"
>
	<button
		class="mx-auto flex flex-col items-center justify-between gap-y-2 rounded-lg p-2 font-medium text-zinc-500 transition-colors hover:bg-zinc-300"
		on:click={handleCreate}
	>
		<Create className="size-6 fill-zinc-500" />
		<span>Click to Add New Card</span>
	</button>
</div>
