import { isJsonString } from '@/utils/is-json';

export function isErrorWithMessage(error: unknown): error is { message: string } {
	return (
		typeof error === 'object' &&
		error !== null &&
		'message' in error &&
		typeof error.message === 'string'
	);
}

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
