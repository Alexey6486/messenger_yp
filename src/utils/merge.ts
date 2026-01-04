import type { TPlainObject } from '@/types';
import { isPlainObject } from '@/utils/is-type';

export function merge(oldObj: TPlainObject, newObj: TPlainObject): TPlainObject {
	for (const p in newObj) {
		if (!Object.hasOwnProperty.call(newObj, p)) {
			continue;
		}

		try {
			console.log('merge: ', { n: newObj[p], o: oldObj[p], newObj, oldObj, p });
			if (isPlainObject(newObj[p]) && isPlainObject(oldObj[p])) {
				oldObj[p] = merge(oldObj[p] as TPlainObject, newObj[p] as TPlainObject);
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
