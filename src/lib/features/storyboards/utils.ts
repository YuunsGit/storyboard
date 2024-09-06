import { lessonStore } from '$lib/features/lessons/stores';
import { get } from 'svelte/store';
import type { Client } from '@urql/svelte';
import { addStoryboard } from '$lib/features/storyboards/queries/AddStoryboard';
import { userStore } from '$lib/features/users/stores';
import { storyboardsStore } from '$lib/features/storyboards/stores';
import { useFragment } from '$lib/gql';
import { storyboardFragment } from '$lib/features/storyboards/queries/StoryboardFragment';
import { fileFragment } from '$lib/features/files/queries/FileFragment';
import { attachFile } from '$lib/features/files/utils';
import { getStoryboards } from '$lib/features/storyboards/queries/GetStoryboards';
import { deleteFile } from '$lib/features/files/queries/DeleteFile';
import { deleteStoryboard } from '$lib/features/storyboards/queries/DeleteStoryboard';
import type { Storyboard } from '$lib/features/storyboards/types';
import { editStoryboard } from '$lib/features/storyboards/queries/EditStoryboard';
import { deleteAllComments } from '$lib/features/comments/queries/DeleteAllComments';

export const getAllStoryboards = async (client: Client) => {
	const lesson = get(lessonStore);

	const storyboardRes = await client
		.query(getStoryboards, {
			lessonId: lesson.data?.id
		})
		.toPromise();

	if (storyboardRes.error) {
		throw new Error('Failed to fetch storyboards');
	}

	storyboardsStore.set({
		data:
			(storyboardRes.data?.storyboardsCollection?.edges ?? []).map(({ node }) => {
				const sb = useFragment(storyboardFragment, node);
				return {
					id: sb.id,
					title: sb.title,
					files: sb.filesCollection?.edges
						.map(({ node }) => node.name)
						.filter((name) => name != null),
					comments: sb.commentsCollection?.edges.map(({ node }) => ({
						id: node.id,
						content: node.content,
						createdAt: node.createdAt,
						username: node.user.username
					})),
					content: sb.content,
					position: sb.position
				};
			}) || null,
		loading: false
	});
};

export const createStoryboard = async (
	client: Client,
	toAdd: { file?: string; title?: string; aboutLesson?: string }
) => {
	const lesson = get(lessonStore);
	const user = get(userStore);
	const sb = get(storyboardsStore);

	const sbRes = await client
		.mutation(addStoryboard, {
			input: {
				title: '',
				...(toAdd.aboutLesson && { content: toAdd.aboutLesson }),
				lessonId: lesson.data?.id,
				userId: user.data?.id,
				position:
					(sb.data
						?.map((s) => s.position)
						.filter((pos) => pos != null)
						.sort((a, b) => (b ?? 0) - (a ?? 0))[0] ?? 0) + 1
			}
		})
		.toPromise();

	if (sbRes.error) {
		throw new Error('Failed to create storyboard');
	}
	const newStoryboard = useFragment(
		storyboardFragment,
		sbRes.data?.insertIntoStoryboardsCollection?.records[0]
	);

	const fileRes = toAdd.file && (await attachFile(client, newStoryboard?.id, toAdd.file));

	storyboardsStore.update((store) => {
		if (store.data) {
			store.data = [
				...store.data,
				{
					title: newStoryboard?.title,
					position: newStoryboard?.position,
					files: fileRes
						? fileRes.data?.insertIntoFilesCollection?.records.map((node) => {
								const file = useFragment(fileFragment, node);
								return file.name || 'file.pdf';
							})
						: [],
					content: newStoryboard?.content,
					comments: newStoryboard?.commentsCollection?.edges.map((edge) => ({
						username: edge.node.user.username,
						content: edge.node.content,
						createdAt: edge.node.createdAt,
						id: edge.node.id
					})),
					id: newStoryboard?.id
				}
			];
		}
		return store;
	});
};

export async function removeStoryboard(client: Client, storyboardId: string) {
	const fileRes = await client
		.mutation(deleteFile, {
			storyboardId: storyboardId
		})
		.toPromise();

	if (fileRes.error) {
		throw new Error('Failed to detach files from storyboard');
	}

	const commentRes = await client
		.mutation(deleteAllComments, {
			storyboardId: storyboardId
		})
		.toPromise();

	if (commentRes.error) {
		throw new Error('Failed to delete comments from storyboard');
	}

	const storyboardRes = await client
		.mutation(deleteStoryboard, {
			id: storyboardId
		})
		.toPromise();

	if (storyboardRes.error) {
		throw new Error('Failed to delete storyboard');
	}

	storyboardsStore.update((store) => {
		if (store.data) {
			store.data = store.data.filter((s) => s.id !== storyboardId);
		}
		return store;
	});
}

export async function updateStoryboard(client: Client, toEdit: Storyboard) {
	const storyboardRes = await client
		.mutation(editStoryboard, {
			id: toEdit.id,
			input: {
				title: toEdit.title ?? undefined,
				content: toEdit.content ?? undefined
			}
		})
		.toPromise();

	if (storyboardRes.error) {
		throw new Error('Failed to update storyboard');
	}
	storyboardsStore.update((store) => {
		const updatedStoryboard = useFragment(
			storyboardFragment,
			storyboardRes?.data?.updateStoryboardsCollection.records[0]
		);
		if (store.data) {
			const index = store.data.findIndex((s) => s.id === updatedStoryboard?.id);
			store.data[index] = {
				...store.data[index],
				title: updatedStoryboard?.title,
				content: updatedStoryboard?.content
			};
		}
		return store;
	});
}
