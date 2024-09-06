import { graphql } from '$lib/gql';

export const deleteComment = graphql(`
	mutation DeleteComment($id: UUID!) {
		deleteFromCommentsCollection(filter: { id: { eq: $id } }) {
			records {
				...Comment
			}
		}
	}
`);
