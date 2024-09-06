import { graphql } from '$lib/gql';

export const getStoryboards = graphql(`
	query GetStoryboards($lessonId: UUID!) {
		storyboardsCollection(filter: { lessonId: { eq: $lessonId } }) {
			edges {
				node {
					...Storyboard
				}
			}
		}
	}
`);
