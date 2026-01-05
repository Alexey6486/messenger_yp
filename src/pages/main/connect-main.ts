import { MainBlock } from './main-block';
import { connect } from '@/hoc';
import type {
	BlockProps,
	IChat,
	IFormState,
	IMessageForm,
	ISearchForm,
	TNullable,
} from '@/types';

export function mapUserToPropsMain(state: Partial<BlockProps>): {
	currentChatId: TNullable<string> | undefined,
	chatsSearchForm: TNullable<IFormState<ISearchForm>> | undefined,
	newMessageForm: TNullable<IFormState<IMessageForm>> | undefined,
	chats: TNullable<IChat[]> | undefined,
	messages: TNullable<IChat[]> | undefined,
} {
	return {
		currentChatId: state?.currentChatId,
		chatsSearchForm: state?.chatsSearchForm,
		newMessageForm: state?.newMessageForm,
		chats: state?.chats,
		messages: state?.messages,
	};
}

const connectMain = connect(mapUserToPropsMain);
export const MainPage = connectMain(MainBlock);
