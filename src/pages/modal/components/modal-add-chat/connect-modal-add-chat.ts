import { ModalAddChatBlock } from './add-chat-block';
import { connect } from '../../../../hoc';
import type {
	BlockProps,
	IAddChatModalForm,
	IFormState,
	TNullable,
} from '../../../../types';
import { StoreEvents } from '../../../../store';

export function mapUserToPropsAddChat(state: Partial<BlockProps>): { modalAddChatForm: TNullable<IFormState<IAddChatModalForm>> | undefined } {
	return {
		modalAddChatForm: state?.modalAddChatForm,
	};
}

const connectAddChat = connect(mapUserToPropsAddChat, StoreEvents.Updated_modal);
export const ModalAddChat = connectAddChat(ModalAddChatBlock);
