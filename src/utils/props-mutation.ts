import { isPlainObject } from '@/utils/is-object';
import type { Indexed } from '@/types';

const prepData = (str: string, val: unknown): Record<string, unknown> => str
	.split('.')
	.reduceRight((acc, key, idx, arr) => ({ [key]: arr.length - 1 === idx ? val : acc }), {});

function merge(lhs: Indexed, rhs: Indexed): Indexed {
	for (let p in rhs) {
		if (!rhs.hasOwnProperty(p)) {
			continue;
		}

		try {
			if (isPlainObject(rhs[p])) {
				rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
			} else {
				lhs[p] = rhs[p];
			}
		} catch (e) {
			lhs[p] = rhs[p];
		}
	}

	return lhs;
}

export function setProps(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
	console.log({ object, path, value });

	if (typeof path !== 'string') {
		throw new Error('path must be string');
	}

	if (typeof object !== 'object') {
		return object;
	}

	const newObject = prepData(path, value);

	return merge(object as Indexed, newObject);
}
