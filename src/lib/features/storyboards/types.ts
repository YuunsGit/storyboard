export type Storyboard = {
	title?: string | null;
	content?: string | null;
	position?: number | null;
	comments?: {
		username?: string | null;
		content?: string | null;
		createdAt?: Date | null;
		id?: string | null;
	}[];
	files?: string[] | null;
	id?: string | null;
};
