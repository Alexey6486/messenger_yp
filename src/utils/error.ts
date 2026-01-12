import { isJsonString } from '@/utils';
import { Store } from '@/store';
import type { Block } from '@/block';
import { IDS } from '@/constants';

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

export function handleRequestError(e: unknown, instance?: Block) {
	if (isErrorWithMessage(e)) {
		const error = JSON.parse(e.message);
		if (instance) {
			Store.set('modalError', { ...error });
			instance.createModal(
				IDS.MODAL.MODAL_ERROR,
				'Ошибка',
			);
		}
	} else {
		throw new Error('Unknown error');
	}
}
