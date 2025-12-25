export type Nullable<T> = T | null;

export type Indexed<T = unknown> = {
	[key in string]: T;
};
