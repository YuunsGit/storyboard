<script lang="ts">
	import Logo from '$lib/icons/Logo.svelte';
	import NavTabs from '$lib/components/header/NavTabs.svelte';
	import HistoryControls from '$lib/components/header/HistoryControls.svelte';
	import LessonProps from '$lib/features/lessons/components/LessonProps.svelte';
	import Button from '$lib/components/Button.svelte';
	import Share from '$lib/icons/Share.svelte';
	import Invite from '$lib/icons/Invite.svelte';

	export let className = '';
</script>

<div class={className}>
	<div
		class="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-x-4 border-b border-zinc-200 px-5 py-3"
	>
		<a href="/">
			<Logo className="size-6" />
			<span class="sr-only">Storyboard home page</span>
		</a>
		<div class="flex h-7 items-center gap-x-4">
			<HistoryControls />
			<LessonProps />
			<Button style={'ghost'}>
				<Invite className="size-5" />
				<span class="sr-only">Invite</span>
			</Button>
			<Button style={'outlined'}>
				<Share className="size-5" />
				<span class="sr-only">Invite</span>
			</Button>
			<Button style={'solid'}>Submit</Button>
		</div>
	</div>
	<div class="bg-white py-2">
		<NavTabs className="mx-auto w-fit" />
	</div>
</div>
