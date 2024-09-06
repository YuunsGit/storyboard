import { graphql } from '$lib/gql';

export const userFragment = graphql(`
	fragment User on Users {
		id
		username
		email
	}
`);
