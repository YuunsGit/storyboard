import type { Client } from '@urql/svelte';
import { useFragment } from '$lib/gql';
import { getFirstUser } from '$lib/features/users/queries/GetFirstUser';
import { userFragment } from '$lib/features/users/queries/UserFragment';
import { userStore } from '$lib/features/users/stores';

export const getUser = async (client: Client) => {
	const userRes = await client.query(getFirstUser, {}).toPromise();

	if (userRes.error) {
		throw new Error('Failed to fetch user');
	}
	const firstUser = useFragment(userFragment, userRes?.data?.usersCollection?.edges[0].node);

	userStore.set({
		data: {
			username: firstUser?.username,
			email: firstUser?.email,
			id: firstUser?.id
		},
		loading: false
	});
};
