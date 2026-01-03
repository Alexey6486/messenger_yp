import { IDS } from '@/constants';
import type {
	IAddUserModalForm,
	IFormState,
} from '@/types';
import { ModalAddUser, ModalErrorBlock } from '@/pages/modal/components';
import { PlaceholderBlock } from '@/components/placeholder/placeholder-block';

export const getModalContentBlock = <T>(
	contentId: string | undefined,
	contentForms?: Record<string, IFormState<T>>,
	onCloseModal?: () => void,
): ModalAddUser | ModalErrorBlock | PlaceholderBlock => {
	switch (contentId) {
		case IDS.FORMS.MODAL_ADD_USER_FORM: {
			if (contentForms && 'modalAddUserForm' in contentForms) {
				const modalAddUserForm = contentForms.modalAddUserForm as IFormState<IAddUserModalForm>;
				return new ModalAddUser({
					onCloseModal,
					modalAddUserForm,
				});
			}
			return new PlaceholderBlock({});
		}
		case IDS.MODAL.MODAL_ERROR: {
			return new ModalErrorBlock({
				onCloseModal,
			});
		}
		default: {
			return new PlaceholderBlock({});
		}
	}
};
