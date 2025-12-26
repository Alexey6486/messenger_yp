import type { TObjectUnknown } from '@/types/general';

export function cloneDeep<T extends object = object>(obj: T) {
    return (function cloneDeepInner(item: T): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
        if (item === null || typeof item !== "object") {
            return item;
        }

        if (item instanceof Date) {
            return new Date(item.valueOf());
        }

        if (item instanceof Array) {
			const copy: T[] = [];

			for (let i = 0; item.length > i; i++) {
				copy[i] = cloneDeepInner(item[i]) as T;
			}

            return copy;
        }

        if (item instanceof Set) {
			const copy = new Set();

            item.forEach(v => copy.add(cloneDeepInner(v)));

            return copy;
        }

        if (item instanceof Map) {
			const copy = new Map();

            item.forEach((v, k) => copy.set(k, cloneDeepInner(v)));

            return copy;
        }

        if (item instanceof Object) {
			const copy: TObjectUnknown = {};
			Object.keys(item as TObjectUnknown).forEach(k => (copy[k] = cloneDeepInner((item as TObjectUnknown)[k] as T)));
            Object.getOwnPropertySymbols(item as TObjectUnknown).forEach(s => (copy[s] = cloneDeepInner((item as TObjectUnknown)[s] as T)));
            return copy;
        }

        throw new Error(`Unable to copy object: ${item}`);
    })(obj);
}
