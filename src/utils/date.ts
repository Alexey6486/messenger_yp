export function formatDate(date: string): string {
	if (!date || !date.length) return '';

	const instance = new Date(date);
	return instance.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	}).replace(',', '');
}
