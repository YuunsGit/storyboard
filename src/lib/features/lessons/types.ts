export type Lesson = {
	title: string;
	selectedVersion: Version;
	versions: Version[];
};

export type Version = {
	versionNumber: number;
};
