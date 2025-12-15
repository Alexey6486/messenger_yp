import { IDS } from '@/constants';
import type {
	IAddUserModalForm,
	IFormState,
} from '@/types';
import { AddUserBlock } from '@/pages/modal/components';
import { PlaceholderBlock } from '@/components/placeholder/placeholder-block';

export const getModalContentBlock = <T>(
	contentId: string | undefined,
	contentForms: Record<string, IFormState<T>>,
): AddUserBlock | PlaceholderBlock => {
	switch (contentId) {
		case IDS.FORMS.MODAL_ADD_USER_FORM: {
			if ('modalAddUserForm' in contentForms) {
				const modalAddUserForm = contentForms.modalAddUserForm as IFormState<IAddUserModalForm>;
				return new AddUserBlock({
					id: '',
					children: {},
					modalAddUserForm,
				});
			}
			return new PlaceholderBlock({});
		}
		default: {
			return new PlaceholderBlock({});
		}
	}
};
