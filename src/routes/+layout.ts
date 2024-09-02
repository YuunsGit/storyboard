import { gql } from '$lib/utils/graphql';
import { getFirstLesson } from '$lib/features/lessons/queries';

export async function load() {
	return {
		lesson: await gql(getFirstLesson)
	};
}
