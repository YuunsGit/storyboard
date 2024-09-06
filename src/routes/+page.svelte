<script lang="ts">
	import { storyboardsStore } from '$lib/features/storyboards/stores';
	import CreateStoryboard from '$lib/features/storyboards/components/CreateStoryboard.svelte';
	import StoryboardLoading from '$lib/features/storyboards/components/StoryboardLoading.svelte';
	import StoryboardPanel from '$lib/features/storyboards/components/StoryboardPanel.svelte';
</script>

{#if $storyboardsStore.loading}
	<StoryboardLoading />
{:else if $storyboardsStore.data && $storyboardsStore.data.length > 0}
	<StoryboardPanel />
{:else}
	<CreateStoryboard />
{/if}
