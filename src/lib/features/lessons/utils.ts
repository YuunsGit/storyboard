import { editLesson } from '$lib/features/lessons/queries/EditLesson';
import { lessonStore } from '$lib/features/lessons/stores';
import { useFragment } from '$lib/gql';
import { lessonFragment } from '$lib/features/lessons/queries/LessonFragment';
import type { Client } from '@urql/svelte';
import { getFirstLesson } from '$lib/features/lessons/queries/GetFirstLesson';

export const getLesson = async (client: Client) => {
	const lessonRes = await client.query(getFirstLesson, {}).toPromise();

	if (lessonRes.error) {
		throw new Error('Failed to fetch lessons');
	}
	const firstLesson = useFragment(
		lessonFragment,
		lessonRes?.data?.lessonsCollection?.edges[0].node
	);

	lessonStore.set({
		data: {
			title: firstLesson?.title,
			id: firstLesson?.id,
			versions: firstLesson?.versionsCollection?.edges
				.map((edge) => edge.node.versionNumber)
				.filter((version): version is number => version !== null && version !== undefined)
		},
		loading: false
	});

	return firstLesson;
};

export const updateLesson = async (client: Client, toEdit: { id: string; title: string }) => {
	const lessonRes = await client
		.mutation(editLesson, {
			id: toEdit.id,
			input: {
				title: toEdit.title
			}
		})
		.toPromise();

	if (lessonRes.error) {
		throw new Error('Failed to update lesson');
	}
	lessonStore.update((lesson) => {
		const updatedLesson = useFragment(
			lessonFragment,
			lessonRes?.data?.updateLessonsCollection.records[0]
		);
		if (lesson.data) {
			lesson.data.title = updatedLesson?.title;
		}
		return lesson;
	});
};
