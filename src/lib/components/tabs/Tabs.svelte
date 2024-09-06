<script lang="ts">
	import cn from '$lib/utils/cn';

	export let label: string;
	export let className = '';
</script>

<nav aria-label={label} class={cn(className, 'mx-auto w-fit')}>
	<ul class="flex items-center gap-x-2 rounded-lg bg-zinc-100 p-1">
		<slot />
	</ul>
</nav>
