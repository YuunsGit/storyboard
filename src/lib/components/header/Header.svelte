<script lang="ts">
	import Logo from '$lib/icons/Logo.svelte';
	import NavTabs from '$lib/components/header/NavTabs.svelte';
	import HistoryControls from '$lib/components/header/HistoryControls.svelte';
	import InviteWidget from '$lib/components/header/InviteWidget.svelte';
	import MobileHeader from '$lib/components/header/MobileHeader.svelte';
	import LessonProps from '$lib/features/lessons/components/LessonProps.svelte';
	import Button from '$lib/components/Button.svelte';
	import Share from '$lib/icons/Share.svelte';
</script>

<header class="sticky top-0 z-40 border-b border-zinc-200 bg-white lg:px-5">
	<div class="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between max-lg:hidden">
		<div class="flex flex-1 items-center gap-x-4">
			<a href="/">
				<Logo className="size-6" />
				<span class="sr-only">Storyboard home page</span>
			</a>
			<div role="separator" aria-orientation="horizontal" class="h-6 w-[1px] bg-zinc-200" />
			<LessonProps />
		</div>
		<div>
			<NavTabs />
		</div>
		<div class="flex flex-1 items-center justify-end gap-x-4">
			<HistoryControls />
			<InviteWidget />
			<Button style={'outlined'}>
				<Share className="size-5" />
				<span class="sr-only">Invite</span>
			</Button>
			<Button style={'solid'}>Submit</Button>
		</div>
	</div>
	<MobileHeader className="lg:hidden" />
</header>
