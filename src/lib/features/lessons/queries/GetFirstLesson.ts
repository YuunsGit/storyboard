import { graphql } from '$lib/gql';

export const getFirstLesson = graphql(`
	query GetFirstLesson {
		lessonsCollection(first: 1) {
			edges {
				node {
					...Lesson
				}
			}
		}
	}
`);
