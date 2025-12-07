export const METHODS = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
} as const;

export type TRequestMethod = keyof typeof METHODS;

export interface IRequestOptions {
	method: TRequestMethod;
	data?: Document | XMLHttpRequestBodyInit | null;
	timeout?: number;
	headers?: Record<string, string>;
}
