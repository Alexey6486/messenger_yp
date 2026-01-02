import { IDS } from '@/constants';
import type {
	IAddUserModalForm,
	IFormState,
} from '@/types';
import { AddUserBlock } from '@/pages/modal/components';
import { PlaceholderBlock } from '@/components/placeholder/placeholder-block';
import { ModalError } from '@/pages/modal/components/error';

export const getModalContentBlock = <T>(
	contentId: string | undefined,
	contentForms?: Record<string, IFormState<T>>,
	onCloseModal?: () => void,
): AddUserBlock | PlaceholderBlock => {
	switch (contentId) {
		case IDS.FORMS.MODAL_ADD_USER_FORM: {
			if (contentForms && 'modalAddUserForm' in contentForms) {
				const modalAddUserForm = contentForms.modalAddUserForm as IFormState<IAddUserModalForm>;
				return new AddUserBlock({
					onCloseModal,
					modalAddUserForm,
				});
			}
			return new PlaceholderBlock({});
		}
		case IDS.FORMS.MODAL_ERROR_FORM: {
			if (contentForms && 'modalErrorForm' in contentForms) {
				const el = new ModalError({
					onCloseModal,
				});
				console.log('getModalContentBlock', { el });
				return el;
			}
			return new PlaceholderBlock({});
		}
		default: {
			return new PlaceholderBlock({});
		}
	}
};
