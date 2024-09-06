<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Plus from '$lib/icons/Plus.svelte';
	import Delete from '$lib/icons/Delete.svelte';
	import { slide, fade } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';
	import type { Storyboard } from '$lib/features/storyboards/types';
	import TimeAgo from 'javascript-time-ago';
	import toast from 'svelte-french-toast';
	import cn from '$lib/utils/cn';
	import { attachComment, detachComment } from '$lib/features/comments/utils';
	import { getContextClient } from '@urql/svelte';
	import { userStore } from '$lib/features/users/stores';

	const timeAgo = new TimeAgo('en-US');

	let client = getContextClient();

	let isCommenting = false;
	let comment = '';
	export let storyboard: Storyboard;

	function toggleCommenting() {
		isCommenting = !isCommenting;
	}

	function handleDeleteComment(commentId: string, storyboardId: string) {
		toast.promise(detachComment(client, commentId, storyboardId), {
			loading: 'Deleting...',
			success: 'Comment deleted',
			error: (error) => error.message
		});
	}

	function handleCommentSubmit() {
		if (!comment || comment.length <= 0) {
			toast.error('Comment cannot be empty');
		} else if (comment.length > 300) {
			toast.error('Comment cannot be more than 300 characters');
		} else if (!$userStore.data?.id) {
			toast.error('You need to be logged in to comment');
		} else if (!storyboard?.id) {
			toast.error('Storyboard not found');
		} else {
			toast.promise(
				attachComment(client, {
					content: comment,
					userId: $userStore.data?.id,
					storyboardId: storyboard.id
				}).finally(() => {
					comment = '';
					isCommenting = false;
				}),
				{
					loading: 'Sending...',
					success: 'Comment sent',
					error: (error) => error.message
				}
			);
		}
	}
</script>

<div>
	<div class="flex items-center justify-between py-2.5">
		<h5 class="font-medium">Comments</h5>
		<Button style={'ghost'} on:click={toggleCommenting} className="!p-1 flex items-center">
			<Plus className="size-5 fill-zinc-500" />
			<span class="px-1 text-sm font-medium text-zinc-500">Add new</span>
		</Button>
	</div>

	<div>
		{#if isCommenting}
			<form
				class="flex flex-col gap-y-2 rounded-lg bg-zinc-100 p-3"
				on:submit|preventDefault={handleCommentSubmit}
				in:slide={{ duration: 300, easing: expoOut }}
			>
				<div class="flex items-center gap-x-2">
					<img
						src="/user.png"
						alt="User avatar"
						class="aspect-video size-6 flex-shrink-0 rounded-full"
					/>
					<span class="text-sm font-medium">Yunus Emre</span>
				</div>
				<div class="relative">
					<textarea
						placeholder="Write your message"
						aria-label="Write your message"
						bind:value={comment}
						class="peer size-full rounded-lg border border-zinc-200 bg-white p-3 text-sm placeholder-zinc-400"
					/>
					<p
						class={cn(
							'absolute bottom-3 right-3 text-xs text-[#DEDEE1] peer-focus-visible:text-zinc-400',
							comment.length > 300 && '!text-red-500'
						)}
					>
						{comment.length}/300
					</p>
				</div>
				<Button
					style={'solid'}
					type="submit"
					className="!rounded-md !px-3 ml-auto mt-auto !py-1 bg-zinc-900 w-fit hover:bg-zinc-900/90 active:bg-zinc-900/80"
				>
					Send
				</Button>
			</form>
		{/if}

		{#if storyboard.comments}
			{#each storyboard.comments as comment (comment.id)}
				<div
					class="mt-2 flex flex-col gap-y-2 rounded-lg bg-zinc-100 p-3"
					animate:flip={{ duration: 400, easing: expoOut }}
				>
					<div class="flex items-center gap-x-2">
						<img src="/user.png" alt="User avatar" class="size-6 flex-shrink-0 rounded-full" />
						<span class="text-sm font-medium">{comment.username}</span>
						{#if comment.createdAt}
							<span class="text-sm text-zinc-500">
								{timeAgo.format(new Date(comment.createdAt))}
							</span>
						{/if}
						<Button
							style={'ghost'}
							on:click={() =>
								comment.id && storyboard.id && handleDeleteComment(comment.id, storyboard.id)}
							className="!p-1 ml-auto hover:bg-zinc-200 active:bg-zinc-200/80"
						>
							<Delete className="size-5 fill-zinc-500" />
							<span class="sr-only">Delete</span>
						</Button>
					</div>
					<p class="line-5 text-sm text-zinc-500">{comment.content}</p>
				</div>
			{/each}
		{/if}
	</div>
</div>
