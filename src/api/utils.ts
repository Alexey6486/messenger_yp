import {
	getErrorText,
	isJsonString,
} from '@/utils';

export function responseHandler(response?: XMLHttpRequest): unknown {
	if (response?.status !== 200) {
		throw new Error(getErrorText(response));
	} else {
		let result = {};
		if (isJsonString(response?.response)) {
			const parsedText = JSON.parse(response.response);
			if (parsedText) {
				result = parsedText;
			}
		}
		return result;
	}
}
