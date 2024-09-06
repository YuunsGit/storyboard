import { graphql } from '$lib/gql';

export const lessonFragment = graphql(`
	fragment Lesson on Lessons {
		id
		title
		versionsCollection {
			edges {
				node {
					versionNumber
				}
			}
		}
	}
`);
