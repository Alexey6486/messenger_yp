import type { IRequestOptions } from '@/http';
import { HTTPTransport } from '@/http';
import type { RequestOptions } from 'http';
import { responseHandler } from '@/utils';

const authAPIInstance = new HTTPTransport();
const url = '/api/v2/user/';

export class UserAPI {
	public profile(options?: Partial<RequestOptions & IRequestOptions>) {
		return authAPIInstance.put(
			`${ url }profile`,
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

	public avatar(options?: Partial<RequestOptions & IRequestOptions>) {
		return authAPIInstance.put(
			`${ url }profile/avatar`,
			{
				...options,
				credentials: 'include',
			},
		).then(resolve => {
			return responseHandler(resolve);
		});
	}

	public password(options?: Partial<RequestOptions & IRequestOptions>) {
		return authAPIInstance.put(
			`${ url }password`,
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

	public search(options?: Partial<RequestOptions & IRequestOptions>) {
		return authAPIInstance.post(
			`${ url }search`,
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
