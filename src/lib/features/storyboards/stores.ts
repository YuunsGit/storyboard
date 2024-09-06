import { writable } from 'svelte/store';
import type { Storyboard } from './types';
import type { Store } from '$lib/utils/types';

export const storyboardsStore = writable<Store<Storyboard[] | undefined>>({
	loading: false
});
