import { graphql } from '$lib/gql';

export const getFiles = graphql(`
	query GetFiles {
		filesCollection {
			edges {
				node {
					...File
				}
			}
		}
	}
`);
