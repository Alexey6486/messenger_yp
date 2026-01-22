import type { TPlainObject } from '../types';
import { merge } from './merge';

const prepData = (str: string, val: unknown): Record<string, unknown> => str
	.split('.')
	.reduceRight((acc, key, idx, arr) => ({ [key]: arr.length - 1 === idx ? val : acc }), {});

export function setProps(object: TPlainObject | unknown, path: string, value: unknown): TPlainObject | unknown {
	if (typeof path !== 'string') {
		throw new Error('path must be string');
	}

	if (typeof object !== 'object') {
		return object;
	}

	const newObject = prepData(path, value);
	return merge(object as TPlainObject, newObject);
}
