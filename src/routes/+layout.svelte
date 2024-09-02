<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
	import '../app.css';

	export let data;

	$: console.log(JSON.stringify(data));
</script>

<Header />
<slot />
