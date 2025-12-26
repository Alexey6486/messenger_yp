import type { TIndexed } from '@/types';
import { isPlainObject } from '@/utils/is-type';

export function merge(lhs: TIndexed, rhs: TIndexed): TIndexed {
	for (const p in rhs) {
		if (!Object.hasOwnProperty.call(rhs, 'key')) {
			continue;
		}

		try {
			if (isPlainObject(rhs[p])) {
				rhs[p] = merge(lhs[p] as TIndexed, rhs[p] as TIndexed);
			} else {
				lhs[p] = rhs[p];
			}
		} catch (e) {
			console.log(e);
			lhs[p] = rhs[p];
		}
	}

	return lhs;
}
