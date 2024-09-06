<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
	import '../app.css';
	import { setContextClient } from '@urql/svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import { onMount } from 'svelte';
	import TimeAgo from 'javascript-time-ago';
	import en from 'javascript-time-ago/locale/en';
	import { getLesson } from '$lib/features/lessons/utils';
	import { getAllStoryboards } from '$lib/features/storyboards/utils';
	import { getUser } from '$lib/features/users/utils';
	import { lessonStore } from '$lib/features/lessons/stores';
	import { storyboardsStore } from '$lib/features/storyboards/stores';
	import { userStore } from '$lib/features/users/stores';

	export let data;
	setContextClient(data.client);

	onMount(() => {
		TimeAgo.addDefaultLocale(en);
	});

	async function fetchData() {
		$lessonStore.loading = true;
		$storyboardsStore.loading = true;
		$userStore.loading = true;

		const lessonRes = await getLesson(data.client).finally(() => {
			$lessonStore.loading = false;
		});

		if (lessonRes?.id) {
			getAllStoryboards(data.client).finally(() => {
				$storyboardsStore.loading = false;
			});
		}

		getUser(data.client).finally(() => {
			$userStore.loading = false;
		});
	}

	toast.promise(
		fetchData(),
		{
			loading: 'Loading...',
			success: 'Data loaded',
			error: 'Failed to load data'
		},
		{
			loading: {
				style: 'display: none;'
			},
			success: {
				style: 'display: none;'
			}
		}
	);
</script>

<svelte:head>
	<title>Storyboard Studio</title>
	<meta
		name="description"
		content="Storyboard studio is a platform for creating and sharing storyboards"
	/>
	<link rel="canonical" href="https://studio.yunusemre.dev" />
	<meta property="og:title" content="Storyboard Studio" />
	<meta
		property="og:description"
		content="Storyboard studio is a platform for creating and sharing storyboards"
	/>
	<meta name="robots" content="index, follow" />
</svelte:head>

<div class="grid min-h-screen grid-cols-1 grid-rows-[auto_1fr]">
	<Header />
	<slot />
</div>
<Toaster
	position="bottom-center"
	toastOptions={{
		duration: 4000
	}}
/>
