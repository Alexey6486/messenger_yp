import { MainBlock } from './main-block';
import { connect } from '@/hoc';
import type {
	BlockProps,
	IChat,
	ICurrentChatData,
	IFormState,
	IMessageForm,
	ISearchForm,
	TNullable,
} from '@/types';
import { cloneDeep } from '@/utils';

export function mapUserToPropsMain(state: Partial<BlockProps>): {
	currentChatData: TNullable<ICurrentChatData> | undefined,
	chatsSearchForm: TNullable<IFormState<ISearchForm>> | undefined,
	newMessageForm: TNullable<IFormState<IMessageForm>> | undefined,
	chats: TNullable<IChat[]> | undefined,
	messages: TNullable<IChat[]> | undefined,
} {
	return {
		currentChatData: state?.currentChatData,
		chatsSearchForm: cloneDeep(state?.chatsSearchForm),
		newMessageForm: state?.newMessageForm,
		chats: state?.chats,
		messages: state?.messages,
	};
}

const connectMain = connect(mapUserToPropsMain);
export const MainPage = connectMain(MainBlock);
