<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
	import '../app.css';
	import { setContextClient } from '@urql/svelte';
	import { Toaster } from 'svelte-french-toast';

	export let data;
	setContextClient(data.client);
</script>

<Header />
<slot />
<Toaster />
