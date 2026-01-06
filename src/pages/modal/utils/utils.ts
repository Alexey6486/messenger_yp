import { IDS } from '@/constants';
import type { Block } from '@/block';
import type {
	IAddChatModalForm,
	IAddUsersModalForm,
	IFormState,
} from '@/types';
import {
	ModalAddChat,
	ModalAddUsers,
	ModalErrorBlock,
} from '@/pages/modal/components';
import { PlaceholderBlock } from '@/components/placeholder/placeholder-block';

export const getModalContentBlock = <T>(
	contentId: string | undefined,
	contentForms?: Record<string, IFormState<T>>,
	onCloseModal?: () => void,
	onSubmit?: (event?: Event, data?: unknown) => void,
): Block => {
	switch (contentId) {
		case IDS.MODAL.MODAL_ERROR: {
			return new ModalErrorBlock({
				onCloseModal,
			});
		}
		case IDS.FORMS.MODAL_ADD_USERS_FORM: {
			if (contentForms && 'modalAddUsersForm' in contentForms) {
				const modalAddUsersForm = contentForms.modalAddUsersForm as IFormState<IAddUsersModalForm>;
				return new ModalAddUsers({
					onCloseModal,
					onSubmit,
					modalAddUsersForm,
				});
			}
			return new PlaceholderBlock({});
		}
		case IDS.FORMS.MODAL_ADD_CHAT_FORM: {
			if (contentForms && 'modalAddChatForm' in contentForms) {
				const modalAddChatForm = contentForms.modalAddChatForm as IFormState<IAddChatModalForm>;
				return new ModalAddChat({
					onCloseModal,
					onSubmit,
					modalAddChatForm,
				});
			}
			return new PlaceholderBlock({});
		}
		default: {
			return new PlaceholderBlock({});
		}
	}
};
