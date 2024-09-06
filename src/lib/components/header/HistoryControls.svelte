<script>
	import Undo from '$lib/icons/Undo.svelte';
	import Redo from '$lib/icons/Redo.svelte';
	import Button from '$lib/components/Button.svelte';
</script>

<div class="flex items-center gap-x-2">
	<Button style={'ghost'}>
		<Undo className="size-5 fill-zinc-500" />
		<span class="sr-only">Undo</span>
	</Button>

	<Button style={'ghost'}>
		<Redo className="size-5" />
		<span class="sr-only">Redo</span>
	</Button>
</div>
