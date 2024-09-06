import { graphql } from '$lib/gql';

export const addFile = graphql(`
	mutation AddFile($input: FilesInsertInput!) {
		insertIntoFilesCollection(objects: [$input]) {
			records {
				...File
			}
		}
	}
`);
