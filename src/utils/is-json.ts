export function isJsonString(str: string | undefined): boolean {
	if (typeof str !== 'string') return false;

	try {
		JSON.parse(str);
		return true;
	} catch (e) {
		console.log('isJsonString error: ', { e });
		return false;
	}
}
