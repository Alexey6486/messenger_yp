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
	const text = (response?.response && response?.response.length)
		? response.response
		: (response?.statusText && response?.statusText.length)
			? `"${ response.statusText }"`
			: '';

	return `{"code": ${ code }, "text": ${ text }}`;
}
