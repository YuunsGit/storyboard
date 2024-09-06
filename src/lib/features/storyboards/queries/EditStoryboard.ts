import { graphql } from '$lib/gql';

export const editStoryboard = graphql(`
	mutation EditStoryboard($id: UUID!, $input: StoryboardsUpdateInput!) {
		updateStoryboardsCollection(filter: { id: { eq: $id } }, set: $input) {
			records {
				...Storyboard
			}
		}
	}
`);
