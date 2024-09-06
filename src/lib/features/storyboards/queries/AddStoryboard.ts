import { graphql } from '$lib/gql';

export const addStoryboard = graphql(`
	mutation AddStoryboard($input: StoryboardsInsertInput!) {
		insertIntoStoryboardsCollection(objects: [$input]) {
			records {
				...Storyboard
			}
		}
	}
`);
