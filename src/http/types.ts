import type { TNullable } from '@/types';

export enum ERequestMethods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export interface IRequestOptions {
	method: ERequestMethods;
	data?: TNullable<Document | XMLHttpRequestBodyInit>;
	headers?: Record<string, string>;
	credentials?: string;
}
