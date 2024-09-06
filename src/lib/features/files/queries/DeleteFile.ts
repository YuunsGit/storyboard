import { graphql } from '$lib/gql';

export const deleteFile = graphql(`
	mutation DeleteFile($storyboardId: UUID!) {
		deleteFromFilesCollection(filter: { storyboardId: { eq: $storyboardId } }, atMost: 200) {
			records {
				...File
			}
		}
	}
`);
