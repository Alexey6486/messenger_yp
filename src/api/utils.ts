import { getErrorText } from '@/utils';

export function responseHandler(response?: XMLHttpRequest): XMLHttpRequest {
	if (response?.status !== 200) {
		throw new Error(getErrorText(response));
	} else {
		return response;
	}
}
