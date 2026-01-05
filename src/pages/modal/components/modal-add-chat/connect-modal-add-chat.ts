import { ModalAddChatBlock } from './add-chat-block';
import { connect } from '@/hoc';
import type {
	BlockProps,
	IAddChatModalForm,
	IFormState,
	TNullable,
} from '@/types';

export function mapUserToPropsAddChat(state: Partial<BlockProps>): { modalAddChatForm: TNullable<IFormState<IAddChatModalForm>> | undefined } {
	return {
		modalAddChatForm: state?.modalAddChatForm,
	};
}

const connectAddChat = connect(mapUserToPropsAddChat);
export const ModalAddChat = connectAddChat(ModalAddChatBlock);
