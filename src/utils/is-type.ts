import type {
	TFunctionUnknown,
	TPlainObject,
} from '@/types';

export function isPlainObject(value: unknown): boolean {
	return typeof value === 'object'
		&& value !== null
		&& value.constructor === Object
		&& Object.prototype.toString.call(value) === '[object Object]';
}

export function isArray(value: unknown, checkLength?: boolean): value is [] {
	if (checkLength) {
		return Array.isArray(value) && value.length > 0;
	}
	return Array.isArray(value);
}

export function isArrayOrObject(value: unknown): value is [] | TPlainObject {
	return isPlainObject(value) || isArray(value);
}

export function isFunction(value: unknown): value is TFunctionUnknown {
	return typeof value === 'function';
}

export function isJsonString(str: unknown | undefined): boolean {
	if (typeof str !== 'string') return false;

	try {
		JSON.parse(str);
		return true;
	} catch (e) {
		console.log('isJsonString error: ', { e });
		return false;
	}
}

export function isErrorWithMessage(error: unknown): error is { message: string } {
	return (
		typeof error === 'object' &&
		error !== null &&
		'message' in error &&
		typeof error.message === 'string'
	);
}
