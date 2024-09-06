import { graphql } from '$lib/gql';

export const getFirstUser = graphql(`
	query GetFirstUser {
		usersCollection(first: 1) {
			edges {
				node {
					...User
				}
			}
		}
	}
`);
