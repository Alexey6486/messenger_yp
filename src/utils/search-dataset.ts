import type { TNullable } from '@/types';

export const searchDataset = (
	element: HTMLElement, dataset: string, parentId?: string, parentClass?: string,
): TNullable<string> => {
	if (
		element
		&& (
			(parentId && !parentClass && element.id !== parentId)
			|| (!parentId && parentClass && !element.classList.contains(parentClass))
		)
	) {
		const targetDataSet = element?.dataset[dataset] as string | undefined;
		if (targetDataSet === dataset) {
			return element.id;
		} else {
			return searchDataset(element.parentElement as HTMLElement, dataset, parentId, parentClass);
		}
	}
	return null;
};
