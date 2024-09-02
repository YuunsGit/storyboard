export const getFirstLesson = /* GraphQL */ `
	query GetFirstLesson {
		lessonsCollection(first: 1) {
			edges {
				node {
					title
					versionsCollection {
						edges {
							node {
								versionNumber
							}
						}
					}
				}
			}
		}
	}
`;
