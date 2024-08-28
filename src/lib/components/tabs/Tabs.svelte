<script lang="ts">
	export let label: string;
	export let className = '';
</script>

<nav aria-label={label} class={className}>
	<ul class="flex items-center gap-x-2 rounded-lg bg-zinc-100 p-1">
		<slot />
	</ul>
</nav>
