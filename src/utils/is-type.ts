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

export function isArray(value: unknown): value is [] {
	return Array.isArray(value);
}

export function isArrayOrObject(value: unknown): value is [] | TPlainObject {
	return isPlainObject(value) || isArray(value);
}

export function isFunction(value: unknown): value is TFunctionUnknown {
	return typeof value === 'function';
}
