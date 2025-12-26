
type CloneableResult<T> =
	T extends Date ? Date :
		T extends Set<unknown> ? Set<unknown> :
			T extends Map<unknown, unknown> ? Map<unknown, unknown> :
				T extends Array<infer U> ? Array<CloneableResult<U>> :
					T extends object ? { [K in keyof T]: CloneableResult<T[K]> } :
						T;

export function cloneDeep<T = unknown>(obj: T): CloneableResult<T> {
    return (function cloneDeepInner<U>(item: U): CloneableResult<U> {
        if (item === null || typeof item !== "object") {
            return item as CloneableResult<U>;
        }

        if (item instanceof Date) {
            return new Date(item.valueOf()) as CloneableResult<U>;
        }

        if (item instanceof Array) {
			const copy: T[] = [];

			for (let i = 0; item.length > i; i++) {
				copy[i] = cloneDeepInner(item[i]) as T;
			}

            return copy as CloneableResult<U>;
        }

        if (item instanceof Set) {
			const copy = new Set();

            item.forEach(v => copy.add(cloneDeepInner(v)));

            return copy as CloneableResult<U>;
        }

        if (item instanceof Map) {
			const copy = new Map();

            item.forEach((v, k) => copy.set(k, cloneDeepInner(v)));

            return copy as CloneableResult<U>;
        }

        if (item instanceof Object) {
			// const copy: TObjectUnknown = {};
			// Object.keys(item as TObjectUnknown).forEach(k => (copy[k] = cloneDeepInner((item as TObjectUnknown)[k] as T)));
            // Object.getOwnPropertySymbols(item as TObjectUnknown).forEach(s => (copy[s] = cloneDeepInner((item as TObjectUnknown)[s] as T)));

			let copy: Record<string, unknown> = {};
            // Object.keys(item).forEach(k => (copy[k] = cloneDeepInner(item[k])));
            // return copy as CloneableResult<U>;

			const keys = Object.keys(item) as Array<keyof typeof item>;
			keys.forEach(k => {
				const key = k as string;
				(copy as Record<string, unknown>)[key] = cloneDeepInner(
					(item as Record<string, unknown>)[key]
				);
			});
        }

        throw new Error(`Unable to copy object: ${item}`);
    })(obj);
}
