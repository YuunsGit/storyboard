<script>
	import Undo from '$lib/icons/Undo.svelte';
	import Redo from '$lib/icons/Redo.svelte';
</script>

<div class="flex items-center gap-x-2">
	<button
		class="rounded-md p-1 transition-colors hover:bg-zinc-100 active:bg-zinc-200 lg:rounded-lg lg:p-2"
	>
		<Undo className="size-5" />
		<span class="sr-only">Undo</span>
	</button>
	<button
		class="rounded-md p-1 transition-colors hover:bg-zinc-100 active:bg-zinc-200 lg:rounded-lg lg:p-2"
	>
		<Redo className="size-5" />
		<span class="sr-only">Redo</span>
	</button>
</div>
