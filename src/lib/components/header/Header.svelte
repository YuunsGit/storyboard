<script>
	import Logo from '$lib/icons/Logo.svelte';
	import NavTabs from '$lib/components/header/NavTabs.svelte';
	import HistoryControls from '$lib/components/HistoryControls.svelte';
	import InviteWidget from '$lib/components/InviteWidget.svelte';
	import SubmitLesson from '$lib/components/SubmitLesson.svelte';
	import ShareButton from '$lib/components/ShareButton.svelte';
	import LessonProps from '$lib/components/LessonProps.svelte';
	import MobileHeader from '$lib/components/header/MobileHeader.svelte';
</script>

<header class="border-b border-zinc-200 bg-white">
	<div
		class="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between px-6 max-lg:hidden"
	>
		<div class="flex items-center gap-x-4">
			<a href="/">
				<Logo className="size-6" />
				<span class="sr-only">Storyboard home page</span>
			</a>
			<div role="separator" aria-orientation="horizontal" class="h-6 w-[1px] bg-zinc-200" />
			<LessonProps />
		</div>
		<NavTabs />
		<div class="flex items-center gap-x-4">
			<HistoryControls />
			<InviteWidget />
			<ShareButton />
			<SubmitLesson />
		</div>
	</div>
	<MobileHeader className="lg:hidden" />
</header>
