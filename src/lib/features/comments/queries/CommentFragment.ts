import { graphql } from '$lib/gql';

export const commentFragment = graphql(`
	fragment Comment on Comments {
		id
		createdAt
		content
		user {
			username
		}
	}
`);
