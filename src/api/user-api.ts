import type { IRequestOptions } from '@/http';
import { HTTPTransport } from '@/http';
import type { RequestOptions } from 'http';
import { responseHandler } from '@/api/utils';

const authAPIInstance = new HTTPTransport();
const baseApi = '/api/v2/user/';

export class UserAPI {
	public profile(options?: Partial<RequestOptions & IRequestOptions>) {
		console.log('UserAPI.profile options: ', { options });

		return authAPIInstance.put(
			`${ baseApi }profile`,
			{
				...options,
				headers: {
					'content-type': 'application/json',
				},
				credentials: 'include',
			},
		).then(resolve => {
			console.log('UserAPI.profile resolve: ', { resolve });

			return responseHandler(resolve);
		});
	}
	public avatar(options?: Partial<RequestOptions & IRequestOptions>) {
		console.log('UserAPI.avatar options: ', { options });

		return authAPIInstance.put(
			`${ baseApi }profile/avatar`,
			{
				...options,
				headers: {
					'content-type': 'application/json',
				},
				credentials: 'include',
			},
		).then(resolve => {
			console.log('UserAPI.avatar resolve: ', { resolve });

			return responseHandler(resolve);
		});
	}
	public password(options?: Partial<RequestOptions & IRequestOptions>) {
		console.log('UserAPI.password options: ', { options });

		return authAPIInstance.put(
			`${ baseApi }password`,
			{
				...options,
				headers: {
					'content-type': 'application/json',
				},
				credentials: 'include',
			},
		).then(resolve => {
			console.log('UserAPI.password resolve: ', { resolve });

			return responseHandler(resolve);
		});
	}
	public search(options?: Partial<RequestOptions & IRequestOptions>) {
		console.log('UserAPI.search options: ', { options });

		return authAPIInstance.post(
			`${ baseApi }search`,
			{
				...options,
				headers: {
					'content-type': 'application/json',
				},
				credentials: 'include',
			},
		).then(resolve => {
			console.log('UserAPI.search resolve: ', { resolve });

			return responseHandler(resolve);
		});
	}
}
