export type Store<T> = {
	loading: boolean;
	data?: T | null;
	error?: Error | null;
};
