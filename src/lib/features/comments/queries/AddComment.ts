import { graphql } from '$lib/gql';

export const addComment = graphql(`
	mutation AddComment($input: CommentsInsertInput!) {
		insertIntoCommentsCollection(objects: [$input]) {
			records {
				...Comment
			}
		}
	}
`);
