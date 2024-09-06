import { graphql } from '$lib/gql';

export const deleteAllComments = graphql(`
	mutation DeleteAllComments($storyboardId: UUID!) {
		deleteFromCommentsCollection(filter: { storyboardId: { eq: $storyboardId } }, atMost: 200) {
			records {
				...Comment
			}
		}
	}
`);
