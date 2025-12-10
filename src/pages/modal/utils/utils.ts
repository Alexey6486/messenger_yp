import type { BlockProps } from '@/types';
import { IDS } from '@/constants';
import { AddUserBlock } from '@/pages/modal/components';

export const getModalContentBlock = (contentId: string, contentForms: BlockProps) => {
	console.log('getModalContentBlock: ', { contentId, contentForms });

	switch (contentId) {
		case IDS.FORMS.MODAL_ADD_USER_FORM: {
			return new AddUserBlock({
				...contentForms,
			});
		}
		default: {
			return '';
		}
	}
};
