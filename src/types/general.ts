export type TNullable<T> = T | null;

export type TIndexed<T = unknown> = {
	[key in string]: T;
};

export type TPlainObject<T = unknown> = {
	[k in string]: T;
};

export type TFunctionUnknown = (...args: unknown[]) => unknown;

export type TObjectUnknown<T = unknown> = { [key: string | number | symbol]: T };

export type TErrorMessage = { message?: string };
