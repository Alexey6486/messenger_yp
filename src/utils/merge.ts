import type { TIndexed } from '@/types';
import { isPlainObject } from '@/utils/is-type';

export function merge(oldObj: TIndexed, newObj: TIndexed): TIndexed {
	for (const p in newObj) {
		if (!Object.hasOwnProperty.call(newObj, p)) {
			continue;
		}

		try {
			console.log('merge: ', { n: newObj[p], o: oldObj[p], newObj, oldObj, p });
			if (isPlainObject(newObj[p])) {
				oldObj[p] = merge(oldObj[p] as TIndexed, newObj[p] as TIndexed);
			} else {
				oldObj[p] = newObj[p];
			}
		} catch (e) {
			console.log(e);
			oldObj[p] = newObj[p];
		}
	}

	return oldObj;
}
