import { graphql } from '$lib/gql';

export const storyboardFragment = graphql(`
	fragment Storyboard on Storyboards {
		id
		createdAt
		title
		content
		position
		commentsCollection {
			edges {
				node {
					id
					user {
						id
						username
						createdAt
					}
					content
					createdAt
				}
			}
		}
		filesCollection {
			edges {
				node {
					id
					name
				}
			}
		}
	}
`);
