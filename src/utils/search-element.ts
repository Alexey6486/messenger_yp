export const hasTargetParent = (
	element: HTMLElement, dataSetKey: string, dataSetValue: string,
): boolean => {
	if (element) {
		const targetDataSet = element?.dataset[dataSetKey] as string | undefined;
		if (targetDataSet === dataSetValue) {
			return true;
		} else {
			return hasTargetParent(element.parentElement as HTMLElement, dataSetKey, dataSetValue);
		}
	}
	return false;
};
