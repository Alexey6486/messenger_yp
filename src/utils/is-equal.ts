import type { TPlainObject } from '../types';
import {
	isArray,
	isArrayOrObject,
} from './is-type';

export function isEqual(lhs: TPlainObject | [], rhs: TPlainObject | []) {
	if (Object.keys(lhs).length !== Object.keys(rhs).length) {
		return false;
	}

	for (const [key, value] of Object.entries(lhs)) {
		const rightValue = isArray(rhs) ? rhs[Number(key)] : rhs[key];
		if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
			if (isEqual(value, rightValue)) {
				continue;
			}
			return false;
		}

		if (value !== rightValue) {
			return false;
		}
	}

	return true;
}
