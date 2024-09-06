import { addFile } from '$lib/features/files/queries/AddFile';
import type { Client } from '@urql/svelte';
import { storyboardsStore } from '$lib/features/storyboards/stores';
import { useFragment } from '$lib/gql';
import { fileFragment } from '$lib/features/files/queries/FileFragment';

export async function attachFile(client: Client, storyboardId: string, file: string) {
	const fileResult = await client
		.mutation(addFile, {
			input: {
				storyboardId: storyboardId,
				name: file
			}
		})
		.toPromise();

	if (fileResult.error) {
		throw new Error('Failed to attach file to storyboard');
	}

	return fileResult;
}

export async function uploadFile(client: Client, storyboardId: string, fileId: string) {
	const attachRes = await attachFile(client, storyboardId, fileId);

	if (attachRes.data) {
		storyboardsStore.update((store) => {
			if (store.data) {
				const file = useFragment(
					fileFragment,
					attachRes.data?.insertIntoFilesCollection?.records[0]
				);
				if (!file?.name) return store;
				const index = store.data.findIndex((s) => s.id === storyboardId);
				store.data[index] = {
					...store.data[index],
					files: [file.name, ...(store.data[index].files ?? [])]
				};
			}
			return store;
		});
	}
}
