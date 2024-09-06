import { writable } from 'svelte/store';
import type { User } from './types';
import type { Store } from '$lib/utils/types';

export const userStore = writable<Store<User | undefined>>({
	loading: false
});
