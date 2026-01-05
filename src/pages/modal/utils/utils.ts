import { IDS } from '@/constants';
import type { Block } from '@/block';
import type {
	BlockProps,
	IAddChatModalForm,
	IAddUserModalForm,
	IFormState,
} from '@/types';
import {
	ModalAddChat,
	ModalAddUser,
	ModalErrorBlock,
} from '@/pages/modal/components';
import { PlaceholderBlock } from '@/components/placeholder/placeholder-block';

export const getModalContentBlock = <T>(
	contentId: string | undefined,
	contentForms?: Record<string, IFormState<T>>,
	onCloseModal?: () => void,
	onSubmit?: (event?: Event, data?: Partial<BlockProps>) => void,
): Block => {
	switch (contentId) {
		case IDS.MODAL.MODAL_ERROR: {
			return new ModalErrorBlock({
				onCloseModal,
			});
		}
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
		case IDS.MODAL.MODAL_ADD_CHAT_FORM: {
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
