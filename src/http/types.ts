export enum ERequestMethods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export interface IRequestOptions {
	method: ERequestMethods;
	data?: Document | XMLHttpRequestBodyInit | null;
	timeout?: number;
	headers?: Record<string, string>;
}
