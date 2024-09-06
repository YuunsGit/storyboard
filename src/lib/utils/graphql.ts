import { cacheExchange, type Client, createClient, fetchExchange } from '@urql/svelte';
import type { LoadEvent } from '@sveltejs/kit';

export const initGraphQLClient = (fetch?: LoadEvent['fetch']): Client =>
	createClient({
		url: import.meta.env.VITE_GRAPHQL_ENDPOINT,
		fetch,
		exchanges: [cacheExchange, fetchExchange]
	});
