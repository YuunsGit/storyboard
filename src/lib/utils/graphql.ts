import {
	cacheExchange,
	type Client,
	createClient,
	fetchExchange,
	type OperationResultStore
} from '@urql/svelte';
import { browser } from '$app/environment';
import type { LoadEvent } from '@sveltejs/kit';

export const initGraphQLClient = (fetch?: LoadEvent['fetch']): Client =>
	createClient({
		url: import.meta.env.VITE_GRAPHQL_ENDPOINT,
		fetch,
		exchanges: [cacheExchange, fetchExchange]
	});

export const loadWaitForNoFetch = async <T extends Record<string, OperationResultStore>>(
	queries: T
): Promise<T> => {
	if (!browser) {
		await Promise.all(
			Object.values(queries).map(
				(query) =>
					new Promise<void>((resolve) => {
						query.subscribe((res) => {
							if (!res.fetching) {
								resolve();
							}
						});
					})
			)
		);
	}
	return queries;
};
