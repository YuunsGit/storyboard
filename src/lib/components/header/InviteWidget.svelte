<script>
	import Invite from '$lib/icons/Invite.svelte';
</script>

<div class="flex items-center gap-x-2 rounded-full bg-zinc-100 p-1">
	<div class="flex items-center -space-x-2">
		{#each [1, 2, 3, 4] as _}
			<img src="/user.png" alt="User avatar" class="size-6 rounded-full border border-zinc-200" />
		{/each}
		<div
			class="flex size-6 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 text-xs leading-none"
		>
			+9
		</div>
	</div>
	<button class="rounded-full p-2 transition-colors hover:bg-zinc-200 active:bg-zinc-300">
		<Invite className="size-5" />
		<span class="sr-only">Invite</span>
	</button>
</div>
