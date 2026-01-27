import { isJsonString } from '@/utils/is-type';

export function getErrorText(response?: XMLHttpRequest) {
	const code = response?.status ?? '';
	let text = '';
	if (isJsonString(response?.response)) {
		const parsedText = JSON.parse(response?.response);
		if (parsedText && parsedText.reason) {
			text = parsedText.reason;
		}
	} else if (typeof response?.statusText === 'string' && !isJsonString(response?.statusText)) {
		text = response.statusText;
	}

	return `{"code": ${ code }, "text": "${ text }"}`;
}

export function responseHandler(response?: XMLHttpRequest): unknown {
	if (typeof response?.status === 'number' && response.status > 399) {
		throw new Error(getErrorText(response));
	} else {
		let result = {};
		if (isJsonString(response?.response)) {
			const parsedText = JSON.parse(response?.response);
			if (parsedText) {
				result = parsedText;
			}
		}
		return result;
	}
}
