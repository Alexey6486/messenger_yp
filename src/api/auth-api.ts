import type { IRequestOptions } from '@/http';
import { HTTPTransport } from '@/http';
import type { RequestOptions } from 'http';
import { responseHandler } from '@/utils';

const authAPIInstance = new HTTPTransport();
const url = '/api/v2/auth/';

export class AuthAPI {
	public signin(options?: Partial<RequestOptions & IRequestOptions>) {
		return authAPIInstance.post(
			`${ url }signin`,
			{
				...options,
				headers: {
					'content-type': 'application/json',
				},
				credentials: 'include',
			},
		).then(resolve => {
			return responseHandler(resolve);
		});
	}

	public logout() {
		return authAPIInstance.post(`${ url }logout`).then(resolve => {
			return responseHandler(resolve);
		});
	}

	public user() {
		return authAPIInstance.get(`${ url }user`).then(resolve => {
			return responseHandler(resolve);
		});
	}

	public signup(options?: Partial<RequestOptions & IRequestOptions>) {
		return authAPIInstance.post(
			`${ url }signup`,
			{
				...options,
				headers: {
					'content-type': 'application/json',
				},
				credentials: 'include',
			},
		).then(resolve => {
			return responseHandler(resolve);
		});
	}
}
