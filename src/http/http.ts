import type { IRequestOptions } from './types';
import { ERequestMethods } from './types';
import type { TNullable } from '@/types';
import type { RequestOptions } from 'http';
import { BASE_API } from '@/constants';

function queryStringify(data: TNullable<Document | XMLHttpRequestBodyInit>) {
	let result = '';
	if (typeof data === 'string') {
		data = JSON.parse(data);
	}

	if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
		const dataList = Object.entries(data);
		if (Array.isArray(dataList) && dataList.length) {
			dataList.forEach((el, idx) => {
				const key = el[0];
				const value = Array.isArray(el[1]) ? el[1].join(',') : el[1];
				if (idx === 0) {
					result += `?${ encodeURIComponent(key) }=${ encodeURIComponent(value) }`;
				} else {
					result += `&${ encodeURIComponent(key) }=${ encodeURIComponent(value) }`;
				}
			});
		}
	}

	return result;
}

type HTTPMethod = (url: string, options?: Partial<RequestOptions & IRequestOptions>) => Promise<XMLHttpRequest>;

export class HTTPTransport {
	private createMethod(method: ERequestMethods): HTTPMethod {
		return (url, options = {}) => this.request(url, { ...options, method });
	}

	readonly get = this.createMethod(ERequestMethods.GET);

	readonly put = this.createMethod(ERequestMethods.PUT);

	readonly post = this.createMethod(ERequestMethods.POST);

	readonly delete = this.createMethod(ERequestMethods.DELETE);

	private request(
		url: string,
		options: Partial<RequestOptions> & IRequestOptions,
	): Promise<XMLHttpRequest> {
		const {
			headers = {},
			credentials = 'include',
			// mode = 'cors',
			method,
			data,
			timeout = 5000,
		} = options;

		return new Promise(function (resolve, reject) {
			if (!method) {
				reject('No method');
				return;
			}

			const xhr = new XMLHttpRequest();
			xhr.withCredentials = credentials === 'include';
			const isGet = method === ERequestMethods.GET;

			xhr.open(
				method,
				isGet && !!data
					? `${BASE_API}${ url }${ queryStringify(data) }`
					: `${BASE_API}${ url }`,
			);

			Object.keys(headers).forEach(key => {
				xhr.setRequestHeader(key, headers[key]);
			});

			xhr.onload = function () {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;

			xhr.timeout = timeout;
			xhr.ontimeout = reject;

			if (isGet || !data) {
				xhr.send();
			} else {
				xhr.send(data);
			}
		});
	}
}
