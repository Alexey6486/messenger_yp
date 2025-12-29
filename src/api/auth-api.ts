import type { IRequestOptions } from '@/http';
import { HTTPTransport } from '@/http';
import type { RequestOptions } from 'http';

const authAPIInstance = new HTTPTransport();
const baseApi = '/api/v2/auth/';

export class AuthAPI {
	public signin(options?: Partial<RequestOptions & IRequestOptions>) {
		console.log('AuthAPI.signin: ', { options });
		return authAPIInstance.post(
			`${ baseApi }signin`,
			{
				...options,
				headers: {
					'content-type': 'application/json',
				},
				credentials: 'include',
			},
		).then(resolve => {
			console.log('AuthAPI.signin: ', { options, resolve });
			if (resolve.status !== 200) {
				throw new Error(`{"code": ${ resolve?.status }, "text": ${ resolve?.response }}`);
			} else {
				return resolve;
			}
		});
	}

	public logout() {
		return authAPIInstance.post(`${ baseApi }logout`);
	}

	public user() {
		return authAPIInstance.get(`${ baseApi }user`);
	}

	public signup(options?: Partial<RequestOptions & IRequestOptions>) {
		console.log('AuthAPI.signup: ', { options });
		return authAPIInstance.post(
			`${ baseApi }signup`,
			{
				...options,
				headers: {
					'content-type': 'application/json',
				},
				credentials: 'include',
			},
		).then(resolve => {
			console.log('AuthAPI.signup resolve: ', { options, resolve });
			if (resolve.status !== 200) {
				throw new Error(`{"code": ${ resolve?.status }, "text": ${ resolve?.response }}`);
			} else {
				return resolve;
			}
		});
	}
}
