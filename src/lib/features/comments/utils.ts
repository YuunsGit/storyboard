import type { Client } from '@urql/svelte';
import { addComment } from '$lib/features/comments/queries/AddComment';
import { storyboardsStore } from '$lib/features/storyboards/stores';
import { useFragment } from '$lib/gql';
import { commentFragment } from '$lib/features/comments/queries/CommentFragment';
import { deleteComment } from '$lib/features/comments/queries/DeleteComment';
import { deleteAllComments } from '$lib/features/comments/queries/DeleteAllComments';

export async function attachComment(
	client: Client,
	toAdd: {
		storyboardId: string;
		content: string;
		userId: string;
	}
) {
	const commentRes = await client
		.mutation(addComment, {
			input: {
				storyboardId: toAdd.storyboardId,
				content: toAdd.content,
				userId: toAdd.userId
			}
		})
		.toPromise();

	if (commentRes.error || !commentRes.data) {
		throw new Error('Failed to add comment');
	}

	storyboardsStore.update((store) => {
		if (store.data) {
			const comment = useFragment(
				commentFragment,
				commentRes.data?.insertIntoCommentsCollection?.records[0]
			);

			if (comment?.id) {
				const index = store.data.findIndex((s) => s.id === toAdd.storyboardId);
				store.data[index] = {
					...store.data[index],
					comments: [
						{
							id: comment?.id,
							content: comment?.content,
							username: comment?.user.username,
							createdAt: comment?.createdAt
						},
						...(store.data[index].comments ?? [])
					]
				};
			} else {
				throw new Error('Failed to add comment');
			}
		}
		return store;
	});
}

export async function detachComment(client: Client, commentId: string, storyboardId: string) {
	const commentRes = await client
		.mutation(deleteComment, {
			id: commentId
		})
		.toPromise();

	if (commentRes.error) {
		throw new Error('Failed to delete comment');
	}

	if (commentRes.data) {
		storyboardsStore.update((store) => {
			if (store.data) {
				const index = store.data.findIndex((s) => s.id === storyboardId);
				store.data[index] = {
					...store.data[index],
					comments: store.data[index].comments?.filter((c) => c.id !== commentId)
				};
			}
			return store;
		});
	}
}

export async function detachAllComments(client: Client, storyboardId: string) {
	const commentRes = await client
		.mutation(deleteAllComments, {
			storyboardId: storyboardId
		})
		.toPromise();

	if (commentRes.error) {
		throw new Error('Failed to delete comments');
	}

	if (commentRes.data) {
		storyboardsStore.update((store) => {
			if (store.data) {
				const index = store.data.findIndex((s) => s.id === storyboardId);
				store.data[index] = {
					...store.data[index],
					comments: []
				};
			}
			return store;
		});
	}
}
