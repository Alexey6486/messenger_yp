import { IDS } from '@/constants';
import { AddUserBlock } from '@/pages/modal/components';
import { PlaceholderBlock } from '@/components/placeholder/placeholder-block';
import type {
	IAddUserModalForm,
	IFormState,
} from '@/types';

export const getModalContentBlock = <T>(contentId: string, contentForms: T): AddUserBlock | PlaceholderBlock => {
	switch (contentId) {
		case IDS.FORMS.MODAL_ADD_USER_FORM: {
			const forms: Record<string, IFormState<IAddUserModalForm>> = { ...contentForms } as Record<string, IFormState<IAddUserModalForm>>;
			return new AddUserBlock({
				id: '',
				children: {},
				forms,
			});
		}
		default: {
			return new PlaceholderBlock({});
		}
	}
};
