import { writable } from 'svelte/store';
import type { Lesson } from './types';
import type { Store } from '$lib/utils/types';

export const lessonStore = writable<Store<Lesson | undefined>>({
	loading: false
});
