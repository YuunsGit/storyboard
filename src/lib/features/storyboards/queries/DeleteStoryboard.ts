import { graphql } from '$lib/gql';

export const deleteStoryboard = graphql(`
	mutation DeleteStoryboard($id: UUID!) {
		deleteFromStoryboardsCollection(filter: { id: { eq: $id } }) {
			records {
				...Storyboard
			}
		}
	}
`);
