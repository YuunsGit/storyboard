<script lang="ts">
	import Logo from '$lib/icons/Logo.svelte';
	import LessonProps from '$lib/components/LessonProps.svelte';
	import NavTabs from '$lib/components/header/NavTabs.svelte';
	import HistoryControls from '$lib/components/HistoryControls.svelte';
	import InviteButton from '$lib/components/InviteButton.svelte';
	import ShareButton from '$lib/components/ShareButton.svelte';
	import SubmitLesson from '$lib/components/SubmitLesson.svelte';

	export let className = '';
</script>

<div class={className}>
	<div
		class="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-x-4 border-b border-zinc-200 px-6 py-3"
	>
		<a href="/">
			<Logo className="size-6" />
			<span class="sr-only">Storyboard home page</span>
		</a>
		<div class="flex h-7 items-center gap-x-4">
			<HistoryControls />
			<LessonProps />
			<InviteButton />
			<ShareButton />
			<SubmitLesson />
		</div>
	</div>
	<div class="bg-white py-2">
		<NavTabs className="mx-auto w-fit" />
	</div>
</div>
