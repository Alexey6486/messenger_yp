import { DATASET } from '@/constants';

export const searchChatId = (element: HTMLElement, dataset: string, parentId: string): string | null => {
    if (element && element.id !== parentId) {
        const targetDataSet = element?.dataset[DATASET.CHAT] as string | undefined;
        if (targetDataSet === dataset) {
            return element.id;
        } else {
            return searchChatId(element.parentElement as HTMLElement, dataset, parentId);
        }
    }
    return null;
};
