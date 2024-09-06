import { graphql } from '$lib/gql';

export const fileFragment = graphql(`
	fragment File on Files {
		id
		name
		storyboardId
	}
`);
