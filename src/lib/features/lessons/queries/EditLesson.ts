import { graphql } from '$lib/gql';

export const editLesson = graphql(`
	mutation EditLesson($id: UUID!, $input: LessonsUpdateInput!) {
		updateLessonsCollection(filter: { id: { eq: $id } }, set: $input) {
			records {
				...Lesson
			}
		}
	}
`);
