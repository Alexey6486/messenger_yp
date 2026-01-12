export function isEmpty(value: unknown) {
	if (value instanceof Set || value instanceof Map) {
		return value.size === 0;
	}

	return value === null
		|| value === undefined
		|| typeof value === 'number'
		|| typeof value === 'boolean'
		|| (typeof value === 'string' && !value.length)
		|| (Array.isArray(value) && !value.length)
		|| (typeof value === 'object' && Object.keys(value).length === 0);
}
