import type { IInputInfo } from '@/types';

export function getFocusData(params?: IInputInfo) {
	return {
		element: params?.element ?? null,
		selectionStart: params?.selectionStart ?? null
	};
}
