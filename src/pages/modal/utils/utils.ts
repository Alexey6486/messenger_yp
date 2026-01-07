import { IDS } from '@/constants';
import type { Block } from '@/block';
import {
	ModalAddChat,
	ModalAddUsers,
	ModalErrorBlock,
	ModalRemoveUsers,
} from '@/pages/modal/components';
import { PlaceholderBlock } from '@/components/placeholder/placeholder-block';

export const getModalContentBlock = (
	contentId: string | undefined,
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
			return new ModalAddUsers({
				onCloseModal,
				onSubmit,
			});
		}
		case IDS.FORMS.MODAL_ADD_CHAT_FORM: {
			return new ModalAddChat({
				onCloseModal,
				onSubmit,
			});
		}
		case IDS.MODAL.MODAL_REMOVE_USERS: {
			return new ModalRemoveUsers({
				onCloseModal,
				onSubmit,
			});
		}
		default: {
			return new PlaceholderBlock({});
		}
	}
};
