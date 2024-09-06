import { writable } from 'svelte/store';

export const inPlaceEditStore = writable<HTMLTextAreaElement | null>(null);
