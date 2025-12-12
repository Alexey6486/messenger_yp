import type { IRequestOptions } from './types';
import { ERequestMethods } from './types';
import type {
	Nullable,
} from '@/types';


function queryStringify(data: Nullable<Document | XMLHttpRequestBodyInit>) {
	let result = '';

	if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
		const dataList = Object.entries(data);
		if (Array.isArray(dataList) && dataList.length) {
			dataList.forEach((el, idx) => {
				const key = el[0];
				const value = Array.isArray(el[1]) ? (el[1] as Array<string>).join(',') : el[1];
				if (idx === 0) {
					result += `?${key}=${value}`;
				} else {
					result += `&${key}=${value}`;
				}
			});
		}
	}

	return result;
}

export class HTTPTransport {
	get = (url: string, options: IRequestOptions = {} as IRequestOptions) => {
		return this.request(url, { ...options, method: ERequestMethods.GET }, options.timeout as number);
	};

	post = (url: string, options: IRequestOptions = {} as IRequestOptions) => {
		return this.request(url, { ...options, method: ERequestMethods.POST }, options.timeout as number);
	};

	put = (url: string, options: IRequestOptions = {} as IRequestOptions) => {
		return this.request(url, { ...options, method: ERequestMethods.PUT }, options.timeout as number);
	};

	delete = (url: string, options: IRequestOptions = {} as IRequestOptions) => {
		return this.request(url, { ...options, method: ERequestMethods.DELETE }, options.timeout as number);
	};

	request = (url: string, options: IRequestOptions = {} as IRequestOptions, timeout = 5000) => {
		const { headers = {}, method, data } = options;

		return new Promise(function (resolve, reject) {
			if (!method) {
				reject('No method');
				return;
			}

			const xhr = new XMLHttpRequest();
			const isGet = method === ERequestMethods.GET;

			xhr.open(
				method,
				isGet && !!data
					? `${url}${queryStringify(data)}`
					: url,
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
	};
}
