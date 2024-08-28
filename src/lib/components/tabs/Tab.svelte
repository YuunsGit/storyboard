<script lang="ts">
	import { page } from '$app/stores';
	import cn from '$lib/utils/cn';

	export let href: string;
	export let target: string = '_self';

	$: isActive = $page.url.pathname === href;
</script>

<li>
	<a
		{href}
		{target}
		rel={target === '_blank' ? 'noopener noreferrer' : null}
		aria-current={isActive ? 'page' : null}
		class={cn(
			'flex items-center justify-center gap-x-2 rounded-md p-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-700',
			isActive && 'bg-white text-zinc-950'
		)}
		{...$$restProps}
	>
		<slot />
	</a>
</li>
