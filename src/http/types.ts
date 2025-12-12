import type { Nullable } from '@/types';

export enum ERequestMethods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export interface IRequestOptions {
	method: ERequestMethods;
	data?: Nullable<Document | XMLHttpRequestBodyInit>;
	timeout?: number;
	headers?: Record<string, string>;
}
