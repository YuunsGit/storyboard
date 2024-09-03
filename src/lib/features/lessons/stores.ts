import { writable } from 'svelte/store';

export const lesson = writable<{
	title?: string | null;
	versions?: number[] | null;
	id?: string | null;
} | null>(null);
