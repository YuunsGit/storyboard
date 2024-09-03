import { initGraphQLClient } from '$lib/utils/graphql';

export const load = async ({ fetch }) => {
	const client = initGraphQLClient(fetch);

	return {
		client
	};
};
