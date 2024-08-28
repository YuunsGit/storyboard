<script>
	import Tab from '$lib/components/tabs/Tab.svelte';
	import Greenmusk from '$lib/icons/Greenmusk.svelte';
	import Tabs from '$lib/components/tabs/Tabs.svelte';

	export let className = '';
</script>

<Tabs label="Navigation" {className}>
	<Tab href="/">Storyboard</Tab>
	<Tab href="/draft">Draft</Tab>
	<Tab href="/review">
		<Greenmusk className="size-5" />
		Review</Tab
	>
</Tabs>
